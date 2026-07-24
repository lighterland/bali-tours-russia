import { Resend } from "resend";
import { enquirySchema, type EnquiryPayload } from "@/lib/enquiry";
import { packages } from "@/lib/catalogue";
import { russian } from "@/lib/i18n";
import { findBaliService } from "@/lib/bali-services";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

function renderEmail(enquiry: EnquiryPayload) {
  const tours = enquiry.packageSelections.map(({ packageId }) => packages.find((item) => item.id === packageId)).filter((item): item is (typeof packages)[number] => Boolean(item));
  const services = enquiry.serviceSelections.map(({ serviceId }) => findBaliService(serviceId)).filter((item): item is NonNullable<ReturnType<typeof findBaliService>> => Boolean(item));
  const uniqueServices = [...new Map(services.map((service) => [service.id, service])).values()];
  const rentalSelection = enquiry.packageSelections.find((selection) => selection.packageId === "vehicle-rental");
  const rentalTour = packages.find((item) => item.id === "vehicle-rental");
  const rentalVariant = rentalTour?.pricing.variants?.find((variant) => variant.id === rentalSelection?.optionId);
  const rentalDays = rentalSelection?.quantity || 1;
  const rentalSubtotal = rentalVariant?.status === "fixed" ? `$${(rentalVariant.amountUsd || 0) * rentalDays}` : rentalSelection ? "On request" : "";
  const interestTitle = [...tours.map((tour) => russian(tour.title)), ...uniqueServices.map((service) => russian(service.title))].join(" · ") || "General Bali enquiry";
  const serviceConfiguration = enquiry.serviceSelections.map((selection) => {
    const service = findBaliService(selection.serviceId);
    const options = selection.optionIds.map((optionId) => service?.options.find((item) => item.id === optionId)).filter(Boolean).map((option) => russian(option!.title));
    return [service ? russian(service.title) : selection.serviceId, options.join(", ")].join(" / ");
  }).join(" · ");
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;color:#667085;border-bottom:1px solid #eee">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee"><strong>${escapeHtml(value || "—")}</strong></td></tr>`;

  return `
    <div style="font-family:Arial,sans-serif;color:#172019;max-width:720px;margin:auto">
      <p style="font-size:12px;letter-spacing:.08em;color:#876b3c">NEW RUSSIAN-MARKET ENQUIRY</p>
      <h1 style="font-size:28px">${escapeHtml(interestTitle)}</h1>
      <table style="width:100%;border-collapse:collapse">
        ${row("Enquiry ID", enquiry.enquiryId)}
        ${row("Name", enquiry.name)}
        ${row("WhatsApp", enquiry.whatsapp)}
        ${row("Preferred channel", enquiry.preferredChannel)}
        ${row("Request type", enquiry.requestType === "open" ? "Open Bali request" : "Selected plan")}
        ${row("Email", enquiry.email)}
        ${row("Date / period", enquiry.date)}
        ${row("Guests", enquiry.guests)}
        ${row("Journey configuration", enquiry.packageSelections.map((item) => [item.packageId, item.optionId, item.quantity ? `x${item.quantity}` : ""].filter(Boolean).join(" / ")).join(" · "))}
        ${rentalSelection ? row("Vehicle", rentalVariant ? russian(rentalVariant.title) : rentalSelection.optionId || "—") : ""}
        ${rentalSelection ? row("Rental duration", `${rentalDays} days`) : ""}
        ${rentalSelection ? row("Rental subtotal", rentalSubtotal) : ""}
        ${row("Service configuration", serviceConfiguration)}
        ${row("Pickup", enquiry.pickup)}
        ${row("Language", enquiry.language)}
        ${row("Source", enquiry.source)}
        ${row("Submitted", enquiry.submittedAt)}
      </table>
      <h2 style="margin-top:24px">Notes</h2>
      <p style="white-space:pre-wrap;padding:16px;background:#f5f3ed;border-radius:12px">${escapeHtml(enquiry.notes || "—")}</p>
      <p style="font-size:12px;color:#667085">Follow up through the guest's preferred channel and record the confirmed programme in the booking summary.</p>
    </div>`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Некорректный запрос." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, message: "Проверьте обязательные поля.", fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return Response.json({ ok: true, enquiryId: parsed.data.enquiryId });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.ENQUIRY_NOTIFICATION_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("Enquiry email configuration is incomplete");
    return Response.json(
      { ok: false, message: "Форма временно недоступна. Напишите нам в WhatsApp." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send(
    {
      from,
      to: [to],
      subject: `New Bali enquiry · ${parsed.data.name} · ${parsed.data.date}`,
      html: renderEmail(parsed.data),
      replyTo: parsed.data.email || undefined,
    },
    { idempotencyKey: `enquiry/${parsed.data.enquiryId}` },
  );

  if (error) {
    console.error("Resend enquiry notification failed", error.name);
    return Response.json(
      { ok: false, message: "Не удалось отправить запрос. Напишите нам в WhatsApp." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true, enquiryId: parsed.data.enquiryId });
}
