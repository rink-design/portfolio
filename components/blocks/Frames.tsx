import type { Item } from "@/lib/media";
import type { Insta } from "@/content/cases";
import { Visual } from "./Visual";

export { SiteIMac } from "./IMac";

const I = {
  heart: "M12 20s-7-4.4-9.2-8.6C1.4 8.6 3 5 6.6 5c2 0 3.4 1.2 5.4 3.2C14 6.2 15.4 5 17.4 5 21 5 22.6 8.6 21.2 11.4 19 15.6 12 20 12 20z",
  chat: "M20.5 12a8.5 8.5 0 1 1-3.4-6.8A8.5 8.5 0 0 1 20.5 12l.9 7.6-6.2-2",
  send: "M21.5 3 3 10.5l7.2 2.6L21.5 3zM10.2 13.1 13 21l8.5-18",
  cam: "M6.5 6.5h11a3.5 3.5 0 0 1 3.5 3.5v6a3.5 3.5 0 0 1-3.5 3.5h-11A3.5 3.5 0 0 1 3 16v-6a3.5 3.5 0 0 1 3.5-3.5zM8.5 6.5 10 4h4l1.5 2.5M12 9.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2z",
  home: "M4 10.5 12 4l8 6.5V20h-5.5v-5.5h-5V20H4z",
  reel: "M8 3.5h8A4.5 4.5 0 0 1 20.5 8v8a4.5 4.5 0 0 1-4.5 4.5H8A4.5 4.5 0 0 1 3.5 16V8A4.5 4.5 0 0 1 8 3.5zM3.5 8.5h17M8.5 3.5l3 5M14 3.5l3 5M10.5 12v5l4.3-2.5z",
  search: "M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm5 11.5 5 5",
  note: "M9 18V6l10-2v12M7 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
};
// iOS-statusbalk: tijd links van het eiland, bereik · wifi · batterij rechts.
function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`ios-sb ${dark ? "is-dark" : ""}`}>
      <span className="ios-time">9:41</span>
      <span className="ios-icons">
        <svg className="ios-signal" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx=".8" /><rect x="4.6" y="5" width="3" height="6" rx=".8" /><rect x="9.2" y="2.6" width="3" height="8.4" rx=".8" /><rect x="13.8" y="0" width="3" height="11" rx=".8" /></svg>
        <svg className="ios-wifi" viewBox="0 0 15 11"><path d="M7.5 2.2c2.2 0 4.2.8 5.7 2.2l1.1-1.2A9.8 9.8 0 0 0 7.5.5 9.8 9.8 0 0 0 .7 3.2l1.1 1.2a8.2 8.2 0 0 1 5.7-2.2zm0 3.3c1.3 0 2.5.5 3.4 1.3l1.1-1.2a6.5 6.5 0 0 0-9 0l1.1 1.2c.9-.8 2.1-1.3 3.4-1.3zm0 3.2c.4 0 .8.1 1.1.4L7.5 10.5 6.4 9.1c.3-.3.7-.4 1.1-.4z" /></svg>
        <svg className="ios-batt" viewBox="0 0 27 12"><rect x=".5" y=".5" width="23" height="11" rx="3.2" fill="none" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="20" height="8" rx="1.8" /><path d="M25 4v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2z" opacity=".45" /></svg>
      </span>
    </div>
  );
}

const Ic = ({ d }: { d: string }) => <svg className="ig-i" viewBox="0 0 24 24" aria-hidden><path d={d} /></svg>;
const Dots = () => <svg className="ig-i" viewBox="0 0 24 24" aria-hidden><circle cx="5" cy="12" r=".6" /><circle cx="12" cy="12" r=".6" /><circle cx="19" cy="12" r=".6" /></svg>;

// Instagram-reel-omgeving over een video (geen verzonnen aantallen of teksten).
function Reel({ ig }: { ig: Insta }) {
  const av = <span className="ig-av"><img src={ig.avatar} alt="" /></span>;
  return (
    <div className="ig" aria-hidden>
      <div className="ig-shade" />
      <StatusBar />
      <div className="ig-top"><span>Reels</span><Ic d={I.cam} /></div>
      <div className="ig-rail"><Ic d={I.heart} /><Ic d={I.chat} /><Ic d={I.send} /><Dots /></div>
      <div className="ig-who">
        <div className="ig-acct">{av}<span>{ig.handle}</span><span className="ig-follow">Follow</span></div>
        <div className="ig-aud"><Ic d={I.note} /><span>{ig.handle} · Original audio</span></div>
      </div>
      <div className="ig-nav"><Ic d={I.home} /><Ic d={I.reel} /><Ic d={I.send} /><Ic d={I.search} />{av}</div>
      <div className="ig-home" />
    </div>
  );
}

// TikTok-omgeving over een video (alleen de vaste app-onderdelen, geen verzonnen aantallen of teksten).
const T = {
  home: "M4 10.5 12 4l8 6.5V20h-5.5v-5.5h-5V20H4z",
  friends: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.5a3.3 3.3 0 0 1 0 6.4M18 14.3c2 .7 3.5 2.6 3.5 5.7",
  inbox: "M4 5h16v11H14l-2 3-2-3H4z",
  user: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4.4 3.6-7 8-7s8 2.6 8 7",
  bookmark: "M6.5 3.5h11v17L12 16l-5.5 4.5z",
  share: "M14 4.5 21 11l-7 6.5v-4C8 13.5 5 15.5 3 20c.5-6 4-10.5 11-11z",
  search: "M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm5 11.5 5 5",
};
const Tf = ({ d }: { d: string }) => <svg className="ig-i tt-fill" viewBox="0 0 24 24" aria-hidden><path d={d} /></svg>;
function TikTok({ ig }: { ig: Insta }) {
  return (
    <div className="ig tt" aria-hidden>
      <div className="ig-shade" />
      <StatusBar />
      <div className="tt-top"><span className="tt-dim">Following</span><span className="tt-on">For You</span><span className="tt-search"><Ic d={T.search} /></span></div>
      <div className="tt-rail">
        <span className="tt-av"><img src={ig.avatar} alt="" /><b>+</b></span>
        <Tf d={I.heart} /><Tf d={I.chat} /><Tf d={T.bookmark} /><Tf d={T.share} />
        <span className="tt-disc"><img src={ig.avatar} alt="" /></span>
      </div>
      <div className="tt-who"><b>{ig.handle}</b><div className="ig-aud"><Ic d={I.note} /><span>original sound · {ig.handle}</span></div></div>
      <div className="tt-nav">
        <span><Ic d={T.home} /><small>Home</small></span><span><Ic d={T.friends} /><small>Friends</small></span>
        <span className="tt-plus">+</span>
        <span><Ic d={T.inbox} /><small>Inbox</small></span><span><Ic d={T.user} /><small>Profile</small></span>
      </div>
      <div className="ig-home" />
    </div>
  );
}

const P = {
  grid: "M3.5 3.5h17v17h-17zM9.2 3.5v17M14.8 3.5v17M3.5 9.2h17M3.5 14.8h17",
  tag: "M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM12 8.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM6.8 18c1-2 3-3.2 5.2-3.2s4.2 1.2 5.2 3.2",
  repost: "M7 7h10l-2.5-2.5M17 17H7l2.5 2.5M4.5 13V10a3 3 0 0 1 3-3M19.5 11v3a3 3 0 0 1-3 3",
  plus: "M12 4v16M4 12h16",
  menu: "M4 7h16M4 12h16M4 17h16",
  back: "M15 5l-7 7 7 7",
};
// Instagram-profiel opnieuw opgebouwd (scherp) met hun echte posts; de hele telefoon linkt naar het echte account.
function Profile({ ig }: { ig: Insta }) {
  return (
    <div className="igp">
      <StatusBar dark />
      <div className="igp-head"><Icd d={P.back} /><b>{ig.handle}</b><Icd d={P.menu} /></div>
      <div className="igp-row">
        <span className="igp-av"><img src={ig.avatar} alt="" /></span>
        <div className="igp-stats">
          <span><b>{ig.posts}</b>posts</span><span><b>{ig.followers}</b>followers</span><span><b>{ig.following}</b>following</span>
        </div>
      </div>
      <p className="igp-name">{ig.name}</p>
      <div className="igp-btns"><span className="is-blue">Follow</span><span>Message</span></div>
      <div className="igp-tabs"><span className="is-on"><Icd d={P.grid} /></span><span><Icd d={I.reel} /></span><span><Icd d={P.repost} /></span><span><Icd d={P.tag} /></span></div>
      <div className="igp-grid">{ig.grid?.map((g) => <img key={g} src={g} alt="" loading="lazy" />)}</div>
      <div className="igp-nav"><Icd d={I.home} /><Icd d={I.reel} /><Icd d={I.send} /><Icd d={I.search} /><span className="ig-av"><img src={ig.avatar} alt="" /></span></div>
    </div>
  );
}
const Icd = ({ d }: { d: string }) => <svg className="igp-i" viewBox="0 0 24 24" aria-hidden><path d={d} /></svg>;

// iPhone 18 Pro (zwart). Video's krijgen de Instagram-reel-omgeving; screenshots staan er al in.
export function Phone({ it, alt, ig }: { it: Item; alt: string; ig?: Insta }) {
  const profile = !it.video && ig?.grid && ig.app !== "tiktok";
  const phone = (
    <div className="iph">
      <div className="iph-body">
        <div className="iph-disp">
          {profile ? <div style={{ aspectRatio: "9/19.5" }} className="relative"><Profile ig={ig} /></div>
            : <Visual it={it} alt={alt} ratio="9/19.5" sizes="(min-width: 768px) 25vw, 50vw" className="[&_img]:object-top" />}
          {it.video && ig && (ig.app === "tiktok" ? <TikTok ig={ig} /> : <Reel ig={ig} />)}
          {(it.video || profile) && <div className="iph-island" aria-hidden />}
        </div>
      </div>
      <i className="iph-btn l1" /><i className="iph-btn l2" /><i className="iph-btn l3" /><i className="iph-btn r1" /><i className="iph-btn r2" />
    </div>
  );
  if (!profile || !ig) return phone;
  return (
    <a href={`https://www.instagram.com/${ig.handle}/`} target="_blank" rel="noopener noreferrer" data-cursor="Instagram" aria-label={`@${ig.handle} on Instagram`} className="block">
      {phone}
      <span className="t-label mt-4 block whitespace-nowrap text-center text-ink">@{ig.handle} ↗</span>
    </a>
  );
}
