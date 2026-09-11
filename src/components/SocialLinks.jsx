const socials = [
  {
    name: "LinkedIn",
    value: "Professional profile",
    href: "https://www.linkedin.com/in/khawaja-muzammil-k-140a5318a",
    symbol: "in",
  },
  {
    name: "Fiverr",
    value: "Freelance services",
    href: "https://www.fiverr.com/users/muzammilkhal221/manage_gigs",
    symbol: "F",
  },
  {
    name: "Email",
    value: "muzammil.khalid39@gmail.com",
    href: "mailto:muzammil.khalid39@gmail.com",
    symbol: "@",
  },
  {
    name: "WhatsApp",
    value: "0332 2483804",
    href: "https://wa.me/923322483804",
    symbol: "W",
  },
  {
    name: "Instagram",
    value: "@codewithmuzz",
    href: "https://www.instagram.com/codewithmuzz?stkn=MTB4bGg0Ymp1dzY2Zw==",
    symbol: "◎",
  },
  {
    name: "Facebook",
    value: "Muzammil Khalid",
    href: "https://www.facebook.com/muzammil.khalid.1420/",
    symbol: "f",
  },
];

export default function SocialLinks() {
  return (
    <div className="social-list">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target={social.name === "Email" ? undefined : "_blank"}
          rel={
            social.name === "Email"
              ? undefined
              : "noopener noreferrer"
          }
        >
          <span className="social-symbol">{social.symbol}</span>

          <span className="social-copy">
            <strong>{social.name}</strong>
            <small>{social.value}</small>
          </span>

          <span className="social-arrow">↗</span>
        </a>
      ))}
    </div>
  );
}