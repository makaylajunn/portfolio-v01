/**
 * Nav wordmark by screen width, longest to shortest:
 * makayla jun (sm+) → makayla j. (32rem) → makayla (24rem) → mj.
 */
export function LogoWordmark() {
  return (
    <>
      <span className="min-[24rem]:hidden">mj</span>
      <span className="hidden min-[24rem]:inline min-[32rem]:hidden">makayla</span>
      <span className="hidden min-[32rem]:inline sm:hidden">makayla j.</span>
      <span className="hidden sm:inline">makayla jun</span>
    </>
  );
}
