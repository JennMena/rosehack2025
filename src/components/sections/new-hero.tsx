
export default function newHero({ className = "" }: FrameProps) {
  return (
    <div
      className={`font-lexend relative z-0 flex w-full items-center pb-[1632px] pl-[18px] pt-[715px] leading-[normal] tracking-[0px] text-yellow-950 ${className}`}
    >
      <div
        className={`before:bg-site-decor relative z-0 h-16 max-h-full w-[450px] max-w-full flex-shrink-0 before:absolute before:inset-0 before:z-[-1] before:bg-no-repeat before:[background-position:-442px_-341.95px] before:[background-size:100%_582%] before:[content:''] before:[transform:rotate(-180deg)]`}
       />
      <div className="z-[2] flex w-96 flex-shrink-0 flex-col items-end">
        <div
          className={`before:bg-site-decor relative z-0 h-16 max-h-full w-[450px] max-w-full flex-shrink-0 before:absolute before:inset-0 before:z-[-1] before:bg-no-repeat before:[background-position:-442px_-341.95px] before:[background-size:100%_582%] before:[content:''] before:[transform:rotate(-180deg)]`}
         />
      </div>
      <div className="z-[3] flex w-96 flex-shrink-0 flex-col items-end">
        <div
          className={`before:bg-site-decor relative z-0 ml-1.5 h-16 max-h-full w-[444px] max-w-full flex-shrink-0 before:absolute before:inset-0 before:z-[-1] before:bg-no-repeat before:[background-position:-442px_-341.95px] before:[background-size:100%_582%] before:[content:''] before:[transform:rotate(-180deg)]`}
         />
      </div>
      <div className="absolute left-32 top-[200px] z-[4] flex h-52 w-[558px] flex-shrink-0 items-center text-[80px] font-bold leading-[normal]" >
        <span>
          <p>{"Let Your "}</p>
          <p>Career Bloom</p>
        </span>
      </div>

      <img
        className="absolute right-[0px] top-[420px] z-[5] h-[50px] w-[1400px] flex-shrink-0 object-cover object-center"
        src="Sparkle.png"
        loading="lazy"
       />
      <img
        className="absolute right-[220px] top-[80px] z-[5] h-[771px] w-[448px] flex-shrink-0 object-cover object-center"
        src="AnnetteFull.png"
        loading="lazy"
       />
      <img
        className="absolute right-[70px] top-[80px] z-[5] h-[175px] w-[175px] flex-shrink-0 object-cover object-center"
        src="Circle.png"
        loading="lazy"
       />
       <img
       className="absolute left-[500px] top-[80px] z-[5] h-[230px] w-[230px] flex-shrink-0 object-cover object-center"
       src="Logo.png"
       loading="lazy"
      />
      <div className="absolute left-32 top-[500px] flex h-20 w-96 flex-shrink-0 items-center justify-center rounded-[21px] border-x-[5px] border-t-[5px] border-solid border-x-[chocolate] border-y-[chocolate] bg-[sandybrown] px-3 [border-bottom-width:5px]" >
        <div className="pb-2 pr-[11px] text-center text-5xl leading-[normal]">
          Sign up today
        </div>
      </div>
    </div>
  );
}

interface FrameProps {
  className?: string;
}
