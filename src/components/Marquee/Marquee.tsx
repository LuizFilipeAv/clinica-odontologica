import styles from './Marquee.module.css';

type Props = {
  /** Scrolls in the opposite direction and tilts the other way. */
  reverse?: boolean;
  tone?: 'coral' | 'teal';
};

const words = [
  'Prevenção',
  'Clareamento',
  'Odontopediatria',
  'Ortodontia',
  'Implantes',
  'Endodontia',
  'Check-up',
];

/** Four-point sparkle, drawn as an SVG so it inherits currentColor. */
function Sparkle() {
  return (
    <svg className={styles.sparkle} viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path
        d="M12 0C12.9 7.7 16.3 11.1 24 12C16.3 12.9 12.9 16.3 12 24C11.1 16.3 7.7 12.9 0 12C7.7 11.1 11.1 7.7 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Decorative ticker band. The whole band is aria-hidden: the words are visual
 * rhythm only. The track holds two identical groups, so translating it by -50%
 * loops seamlessly. Each group repeats the word list so it is always wider than
 * the band on large screens.
 */
export default function Marquee({ reverse = false, tone = 'coral' }: Props) {
  const bandClass = [styles.band, styles[tone], reverse ? styles.reverse : '']
    .filter(Boolean)
    .join(' ');
  const trackClass = reverse ? `${styles.track} ${styles.trackReverse}` : styles.track;
  const row = [...words, ...words];

  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={bandClass}>
        <div className={trackClass}>
          {[0, 1].map((group) => (
            <div className={styles.group} key={group}>
              {row.map((word, i) => (
                <span className={styles.item} key={`${i}-${word}`}>
                  {word}
                  <Sparkle />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
