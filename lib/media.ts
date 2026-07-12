export type MediaAsset = {
  url: string;
  role: "atmosphere" | "operational-proof";
};

export const mediaAssets = {
  riceTerraces: {
    url: "https://images.pexels.com/photos/33720812/pexels-photo-33720812.jpeg?auto=compress&cs=tinysrgb&w=2200",
    role: "atmosphere",
  },
  nusaPenida: {
    url: "https://images.pexels.com/photos/32021944/pexels-photo-32021944.jpeg?auto=compress&cs=tinysrgb&w=1800",
    role: "atmosphere",
  },
  sunsetTemple: {
    url: "https://images.pexels.com/photos/33626257/pexels-photo-33626257.jpeg?auto=compress&cs=tinysrgb&w=1800",
    role: "atmosphere",
  },
} satisfies Record<string, MediaAsset>;
