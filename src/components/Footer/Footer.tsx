import Logo from '@/components/Logo/Logo';
import styles from './Footer.module.css';

const navLinks = [
  { href: '#sobre', label: 'A Alva' },
  { href: '#cuidados', label: 'Cuidados' },
  { href: '#consulta', label: 'Primeira consulta' },
  { href: '#espaco', label: 'Espaço' },
  { href: '#duvidas', label: 'Dúvidas' },
  { href: '#agendar', label: 'Agendar' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <a href="#inicio" className={styles.mark} aria-label="Voltar ao início">
          <Logo variant="full" tone="on-teal" className={styles.logo} />
        </a>

        <div className={styles.grid}>
          <p className={styles.note}>
            Alva Odontologia é uma clínica fictícia criada como projeto de portfólio. Nenhum
            atendimento, contato ou agendamento é real.
          </p>

          <nav className={styles.nav} aria-label="Rodapé">
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.aside}>
            <p className={styles.note}>Imagens ilustrativas geradas para este projeto.</p>
            <a href="#inicio" className={styles.top}>
              Voltar ao topo
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} Alva Odontologia · projeto conceitual</p>
        </div>
      </div>
    </footer>
  );
}
