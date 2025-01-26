export default function NewHero({ className = "" }: FrameProps) {
    return (
      <div
        className={`font-lexend relative z-0 flex w-full flex-col items-end pb-[1315px] pl-[725px] pr-[76px] pt-80 leading-[normal] tracking-[0px] text-yellow-950 ${className}`}
      >
        <div className="absolute left-[18px] right-0 top-[calc(50%_+_-30.36px_+_-458.64px)] z-0 flex h-16 flex-shrink-0 flex-col items-center" >
          <div className="flex items-center justify-center">
            <div
              className={`before:bg-site-decor relative z-0 h-16 max-h-full w-[450px] max-w-full flex-shrink-0 before:absolute before:inset-0 before:z-[-1] before:bg-no-repeat before:[background-position:-442px_-341.95px] before:[background-size:100%_582%] before:[content:''] before:[transform:rotate(-180deg)]`}
             />
            <div className="flex w-96 flex-shrink-0 flex-col items-end">
              <div
                className={`before:bg-site-decor relative z-0 h-16 max-h-full w-[450px] max-w-full flex-shrink-0 before:absolute before:inset-0 before:z-[-1] before:bg-no-repeat before:[background-position:-442px_-341.95px] before:[background-size:100%_582%] before:[content:''] before:[transform:rotate(-180deg)]`}
               />
            </div>
            <div className="flex w-96 flex-shrink-0 flex-col items-end">
              <div
                className={`before:bg-site-decor relative z-0 ml-1.5 h-16 max-h-full w-[444px] max-w-full flex-shrink-0 before:absolute before:inset-0 before:z-[-1] before:bg-no-repeat before:[background-position:-442px_-341.95px] before:[background-size:100%_582%] before:[content:''] before:[transform:rotate(-180deg)]`}
               />
            </div>
          </div>
        </div>
        <div className="absolute left-32 top-[501px] z-[2] flex h-52 w-[558px] flex-shrink-0 items-start pl-[558px] pt-52" >
          <div className="absolute inset-0 text-[80px] font-bold leading-[normal]" >
            <span>
              <p>{"Let Your "}</p>
              <p>Career Bloom</p>
            </span>
          </div>
        </div>
        <div className="absolute left-[30px] right-0 top-[363px] z-[3] flex h-60 w-[1219px] flex-shrink-0 flex-col items-center" >
          <div className="relative z-0 ml-[9px] flex w-[1237px] items-center justify-end pl-[452px]" >
            <div className="absolute left-0 top-[calc(50%_+_-30.36px_+_-15.14px)] z-0 flex h-16 w-[843px] flex-shrink-0 flex-col items-center" >
              <div className="flex items-center justify-center">
                <div
                  className={`before:bg-site-decor relative z-0 h-16 max-h-full w-[450px] max-w-full flex-shrink-0 before:absolute before:inset-0 before:z-[-1] before:bg-no-repeat before:[background-position:-442px_-341.95px] before:[background-size:100%_582%] before:[content:''] before:[transform:rotate(-180deg)]`}
                 />
                <div className="flex w-96 flex-shrink-0 flex-col items-end">
                  <div
                    className={`before:bg-site-decor relative z-0 h-16 max-h-full w-[450px] max-w-full flex-shrink-0 before:absolute before:inset-0 before:z-[-1] before:bg-no-repeat before:[background-position:-442px_-341.95px] before:[background-size:100%_582%] before:[content:''] before:[transform:rotate(-180deg)]`}
                   />
                </div>
              </div>
            </div>
            <div className="z-[2] flex flex-wrap items-center justify-center gap-x-[90px] gap-y-12 min-[1239px]:flex-nowrap" >
              <div className="bg-t-bg-ellipse-1logo z-0 flex h-60 w-60 flex-shrink-0 flex-col items-center justify-center bg-cover bg-center px-3 pb-[13px] pt-3" >
                <img
                  className="z-[2] h-56 w-56 flex-shrink-0 object-cover object-center"
                  src="/assets/logo.png"
                  loading="lazy"
                 />
              </div>
              <div className="flex flex-col items-center pb-[30px]">
                <div
                  className={`before:bg-site-decor relative z-0 h-16 max-h-full w-[450px] max-w-full flex-shrink-0 before:absolute before:inset-0 before:z-[-1] before:bg-no-repeat before:[background-position:-442px_-341.95px] before:[background-size:100%_582%] before:[content:''] before:[transform:rotate(-180deg)]`}
                 />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-t-annettefull z-[4] h-[771px] w-[448px] flex-shrink-0 bg-cover bg-center pl-[448px] pt-[771px]" />
        <div className="absolute left-32 top-[calc(50%_+_-39px_+_-381px)] flex h-20 w-96 flex-shrink-0 items-start pl-96 pt-20" >
          <div className="absolute inset-0 flex items-center justify-center rounded-[21px] border-x-[5px] border-t-[5px] border-solid border-x-black border-y-black bg-[sandybrown] px-3 [border-bottom-width:5px]" >
            <div className="pb-2 pr-[11px] text-center text-5xl leading-[normal]" >
              Sign up today
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  interface FrameProps {
    className?: string;
  }
  