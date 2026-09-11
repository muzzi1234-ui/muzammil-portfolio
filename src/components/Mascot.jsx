export default function Mascot() {
  return (
    <div className="mascot" aria-label="Muzammil mascot">
      <div className="mascot-bubble">
        <span>Let's build.</span>
      </div>

      <div className="mascot-body">
        <div className="mascot-face">
          <span className="eye eye-left" />
          <span className="eye eye-right" />
          <span className="mouth" />
        </div>

        <div className="mascot-ear ear-left" />
        <div className="mascot-ear ear-right" />
      </div>
    </div>
  );
}