import { site } from "@/data/site";
import { publicFileExists } from "@/lib/publicFile";
import { HeroClient } from "./HeroClient";

// Thin server wrapper: the profile-photo existence check needs Node's fs,
// which only runs on the server — everything locale-aware lives in the
// client component below it.
export function Hero() {
  const hasPhoto = site.photo.enabled && publicFileExists(site.photo.src);
  return <HeroClient hasPhoto={hasPhoto} />;
}
