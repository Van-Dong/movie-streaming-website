import MainModal from "./MainModal";
import {
  FaFacebook,
  FaPinterest,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { MdEmail } from "react-icons/md";

const ShareMovieModal = ({ modalOpen, setModalOpen, movie }) => {
  const shareData = [
    {
      icon: FaFacebook,
      shareButton: FacebookShareButton,
    },
    {
      icon: FaTwitter,
      shareButton: TwitterShareButton,
    },
    {
      icon: FaTelegram,
      shareButton: TelegramShareButton,
    },
    {
      icon: FaWhatsapp,
      shareButton: WhatsappShareButton,
    },
    {
      icon: FaPinterest,
      shareButton: PinterestShareButton,
    },
    {
      icon: MdEmail,
      shareButton: EmailShareButton,
    },
  ];
  const url = `${window.location.protocol}//${
    window.location.host
  }/movie/${encodeURI(movie?.id)}`;

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div
        className="inline-block border border-border sm:w-4/5 md:w-3/5 lg:w-2/5 w-full align-middle p-10 
      overflow-y-auto h-full bg-main text-white rounded-2xl"
      >
        <h2 className="text-3xl font-bold">
          Share{" "}
          <span className="text-2xl font-bold text-subMain">
            {movie?.title}
          </span>
        </h2>
        <form className="flex-rows flex-wrap gap-6 mt-6">
          {shareData.map((data, index) => (
            <data.shareButton
              key={index}
              url={url}
              quote="Netflix | Free Movies Site"
            >
              <div className="w-12 h-12 bg-white hover:bg-subMain flex-colo text-lg rounded bg-opacity-30">
                <data.icon className="text-white" />
              </div>
            </data.shareButton>
          ))}
        </form>
      </div>
    </MainModal>
  );
};

export default ShareMovieModal;
