const links = [
  {
    label: "Email",
    href: "mailto:muzammil.khalid39@gmail.com",
    symbol: "@",
  },
  {
    label: "Fiverr",
    href: "https://www.fiverr.com/users/muzammilkhal221/manage_gigs",
    symbol: "F",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/923322483804",
    symbol: "W",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/codewithmuzz?stkn=MTB4bGg0Ymp1dzY2Zw==",
    symbol: "◎",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/muzammil.khalid.1420/",
    symbol: "f",
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <a href="#home" className="footer-brand">
            Muzammil Khalid.
          </a>

          <p>
            Full Stack Development × Business Technology ×
            Data & Automation
          </p>
        </div>

        <a href="#home" className="back-top">
          Back to top <span>↑</span>
        </a>

        <div className="footer-socials">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label === "Email" ? undefined : "_blank"}
              rel={
                link.label === "Email"
                  ? undefined
                  : "noopener noreferrer"
              }
              aria-label={link.label}
            >
              {link.symbol}
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Muzammil Khalid</span>
        <span>Project by Muzammil</span>
      </div>
    </footer>
  );
}