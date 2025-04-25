import background from "../assets/backgroundBook.jpg";

export default function BookHeader() {
  return (
    <div className="fixed top-[132px] left-0 right-0 ml-[81px] mr-[81px] flex items-center w-auto h-[411px] overflow-hidden z-10">
      <div className="flex flex-col text-[64px] font-medium flex-[1.2]">
        <div>Let's</div>
        <div className="flex flex-row">
          <div className="text-Primary">travel </div>
          <div>&nbsp;the </div>
        </div>
        <div>world</div>
        <div className="text-[16px]">
          <div className="flex flex-row">
            <div>Enjoy the&nbsp;</div>
            <div className="text-Primary">breathtaking </div>
            <div>&nbsp;view of nature, </div>
          </div>
          <div className="flex flex-row">
            <div>Relax an cherish your&nbsp;</div>
            <div className="text-Primary"> dreams </div>
            <div> &nbsp;to the fullest </div>
          </div>
        </div>
      </div>

      <div className="h-full flex-[1.8] flex items-center justify-center">
        <img
          src={background}
          className="h-full w-full object-cover object-bottom rounded-[9px] "
        />
      </div>
    </div>
  );
}
