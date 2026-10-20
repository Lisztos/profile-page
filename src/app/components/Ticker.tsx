import { site } from "@/lib/site";

function TickerSegment() {
  return (
    <b>
      {site.tickerItems.map((item, i) => (
        <span key={`${item}-${i}`}>
          {item}
          {i < site.tickerItems.length - 1 ? (
            <>
              &nbsp;<i>·</i>&nbsp;
            </>
          ) : (
            <>
              &nbsp;<i>-</i>&nbsp;
            </>
          )}
        </span>
      ))}
    </b>
  );
}

export function Ticker() {
  return (
    <div className="ticker hero-fade d4" aria-hidden="true">
      <div className="track">
        <TickerSegment />
        <TickerSegment />
      </div>
    </div>
  );
}
