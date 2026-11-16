import s from './Logo.module.css';

type Props = {
  className?: string;
  /** full: wordmark + smile + "odontologia"; mark: wordmark + smile only */
  variant?: 'full' | 'mark';
  /** palette: on teal (cream face) or on light grounds (teal face) */
  tone?: 'on-teal' | 'on-light';
};

/**
 * Alva wordmark. Chunky extruded letters with a hatched depth face, and a swash
 * underneath drawn as a smile. Everything sizes from font-size.
 * Animation hooks (used by the intro and the hero): .logo__depth, .logo__face,
 * .logo__smile path, .logo__tag.
 */
export default function Logo({ className = '', variant = 'full', tone = 'on-teal' }: Props) {
  return (
    <span className={`${s.logo} ${s[tone]} logo ${className}`} role="img" aria-label="Alva Odontologia">
      <span className={s.word} aria-hidden="true">
        <span className={`${s.depth} logo__depth`}>Alva</span>
        <span className={`${s.hatch} logo__depth`}>Alva</span>
        <span className={`${s.face} logo__face`}>Alva</span>
      </span>
      <svg className={`${s.smile} logo__smile`} viewBox="0 0 300 60" fill="none" aria-hidden="true">
        {/* depth, outline, face: the same smile curve three times */}
        <path className={s.smileDepth} d="M14 18 C 70 58, 214 62, 288 10" />
        <path className={s.smileLine} d="M10 22 C 66 62, 210 66, 284 14" />
        <path className={s.smileFace} d="M10 22 C 66 62, 210 66, 284 14" />
      </svg>
      {variant === 'full' && <span className={`${s.tag} logo__tag`} aria-hidden="true">Odontologia</span>}
    </span>
  );
}
