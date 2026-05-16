export const LOCAL_LISTINGS_KEY = "petamikke_listings";

export type ListingType = "販売のみ" | "交換のみ" | "両方OK";
export type ListingCondition = "未使用" | "良好" | "傷あり";

export type UserListing = {
  id: string;
  ownerUserId: string;
  ownerUsername: string;
  ownerEmail: string;
  name: string;
  series: string;
  condition: ListingCondition;
  listingType: ListingType;
  price: number;
  description: string;
  status: "出品中";
  createdAt: string;
};

export function readStoredListings() {
  if (typeof window === "undefined") return [] as UserListing[];

  try {
    const raw = window.localStorage.getItem(LOCAL_LISTINGS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as UserListing[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeStoredListings(listings: UserListing[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCAL_LISTINGS_KEY, JSON.stringify(listings));
}
