import cursorSvg from "./cursor.svg";
import emailSvg from "./email.svg";
import frogSvg from "./frog.svg";
import smileySvg from "./smiley.svg";
import sparklesSvg from "./sparkles.svg";

/**
 * Icons from this folder. The exported files use fill="white", which would
 * vanish on the oatmeal background, so each path is drawn with `currentColor`
 * and picks up the ink of the label or control it sits in.
 */

type IconProps = { className?: string };

function asSvgSource(source: unknown): string {
  if (typeof source === "string") return source;
  if (
    source &&
    typeof source === "object" &&
    "default" in source &&
    typeof (source as { default: unknown }).default === "string"
  ) {
    return (source as { default: string }).default;
  }
  const detail =
    source && typeof source === "object"
      ? `${source.constructor?.name}:{${Object.keys(source).join(",")}}`
      : String(source);
  throw new Error(`SVG import was not text (${typeof source} ${detail})`);
}

function readSvg(source: unknown) {
  const text = asSvgSource(source);
  const viewBox = text.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 21 20";
  const paths = [...text.matchAll(/<path\b[^>]*\sd="([^"]+)"/g)].map(
    (match) => match[1],
  );
  return { viewBox, paths };
}

const cursor = readSvg(cursorSvg);
const email = readSvg(emailSvg);
const frog = readSvg(frogSvg);
const smiley = readSvg(smileySvg);
const sparkles = readSvg(sparklesSvg);

/** Sparkles geometry, shared with the animated logo mark (`LogoSparkle`). */
export const SPARKLES_VIEWBOX = sparkles.viewBox;
export const SPARKLES_PATHS = {
  star: sparkles.paths[0] ?? "",
  plusBottom: sparkles.paths[1] ?? "",
  plusTop: sparkles.paths[2] ?? "",
} as const;

function PixelIcon({
  viewBox,
  paths,
  className = "",
}: IconProps & { viewBox: string; paths: string[] }) {
  return (
    <svg
      viewBox={viewBox}
      fill="currentColor"
      aria-hidden
      className={className}
    >
      {paths.map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  );
}

/** Pointer arrow with a tail. Work. */
export function CursorIcon({ className = "" }: IconProps) {
  return (
    <PixelIcon
      viewBox={cursor.viewBox}
      paths={cursor.paths}
      className={className}
    />
  );
}

/** Closed envelope. Contact. */
export function EmailIcon({ className = "" }: IconProps) {
  return (
    <PixelIcon
      viewBox={email.viewBox}
      paths={email.paths}
      className={className}
    />
  );
}

/** Pixel smiley. About. */
export function SmileyIcon({ className = "" }: IconProps) {
  return (
    <PixelIcon
      viewBox={smiley.viewBox}
      paths={smiley.paths}
      className={className}
    />
  );
}

/** Frog face. Fun. */
export function FrogIcon({ className = "" }: IconProps) {
  return (
    <PixelIcon
      viewBox={frog.viewBox}
      paths={frog.paths}
      className={className}
    />
  );
}

/** Four-point star with two small plus accents. */
export function SparklesIcon({ className = "" }: IconProps) {
  return (
    <PixelIcon
      viewBox={SPARKLES_VIEWBOX}
      paths={[
        SPARKLES_PATHS.star,
        SPARKLES_PATHS.plusBottom,
        SPARKLES_PATHS.plusTop,
      ]}
      className={className}
    />
  );
}
