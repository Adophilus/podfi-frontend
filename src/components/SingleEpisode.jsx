import { useLocation } from "react-router-dom"
import AudioPlayer from "./AudioPlayer"
import Share from "./Share"
import { useEffect } from "react"
const SingleEpisode = ({ user, episode, creator, podcastId }) => {
  const location = useLocation()
  useEffect(()=>{
    //handle navigation to active epi
    if (location.hash) {
      const targetElement = document.getElementById(location.hash.substring(1))

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" })
        targetElement.querySelector('.play').focus()
      }
    }
  },[location.hash])
  return (
    <div id={`${episode.id}`} className="flex flex-col items-center md:flex-row w-full text-sm xs:text-base gap-4 lg:gap-x-8">
      {/* epi container */}
      <div className="w-full bg-blue-500 rounded-2xl min-h-[100px] p-3 xs:px-6 xs:py-4 text-white font-montserrat font-semibold">
        <div className="w-full flex justify-between gap-x-2 md:gap-x-4 items-start">
          <svg
            className="fill-white w-[30px] -mt-1"
            width="57"
            height="40"
            viewBox="0 0 57 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M31.4474 3.14474C31.4474 1.40795 30.0394 0 28.3026 0C26.5658 0 25.1579 1.40795 25.1579 3.14474L25.1579 36.6886C25.1579 38.4254 26.5658 39.8333 28.3026 39.8333C30.0394 39.8333 31.4474 38.4254 31.4474 36.6886L31.4474 3.14474Z" />
            <path d="M18.8684 7.33772C18.8684 5.60093 17.4605 4.19298 15.7237 4.19298C13.9869 4.19298 12.5789 5.60093 12.5789 7.33772L12.5789 32.4956C12.5789 34.2324 13.9869 35.6404 15.7237 35.6404C17.4605 35.6404 18.8684 34.2324 18.8684 32.4956V7.33772Z" />
            <path d="M44.0263 7.33772C44.0263 5.60093 42.6184 4.19298 40.8816 4.19298C39.1448 4.19298 37.7368 5.60093 37.7368 7.33772V32.4956C37.7368 34.2324 39.1448 35.6404 40.8816 35.6404C42.6184 35.6404 44.0263 34.2324 44.0263 32.4956V7.33772Z" />
            <path d="M6.28947 15.7237C6.28947 13.9869 4.88153 12.5789 3.14474 12.5789C1.40795 12.5789 0 13.9869 0 15.7237V24.1096C0 25.8464 1.40795 27.2544 3.14474 27.2544C4.88153 27.2544 6.28947 25.8464 6.28947 24.1096V15.7237Z" />
            <path d="M56.6053 15.7237C56.6053 13.9869 55.1973 12.5789 53.4605 12.5789C51.7237 12.5789 50.3158 13.9869 50.3158 15.7237V24.1096C50.3158 25.8464 51.7237 27.2544 53.4605 27.2544C55.1973 27.2544 56.6053 25.8464 56.6053 24.1096V15.7237Z" />
          </svg>
          <h2 className="text-center">{episode.title}</h2>

          <div className="flex flex-col xs:flex-row gap-x-2 gap-y-2 xs:gap-x-6 px-2 xs:px-4 items-center border-l-2 border-r-2 border-zinc-400 h-fit">
            {/* participants */}
            <div className="flex">
              {episode.participants.map((participant) => (
                <div
                  key={participant.username}
                  className="rounded w-5 h-5 xxs:w-7 xxs:h-7 border border-white overflow-hidden"
                >
                  <img
                    src={participant.profilePicture}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
            {/* host */}
            <div className="flex flex-col xxs:flex-row gap-x-4 gap-y-2 items-center">
              <span className="text-sm">{episode.host}</span>
              <span className="text-[8px] px-2 w-fit h-fit rounded bg-black drop-shadow-[1px_1px_7px_rgba(0,0,0,0.9)]">
                Host
              </span>
            </div>
          </div>
          <div className="dropdown dropdown-end ">
            <div tabIndex={0} role="button">
              <img
                src="/images/menu_kebab.svg"
                width={4}
                height={15}
                className="pt-1 min-w-1 cursor-pointer"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-10 menu p-2 shadow bg-white dark:bg-neutral-800 text-black dark:text-white stroke-black dark:stroke-white rounded-box w-52"
            >
              <div
                onClick={(e) => {
                  // fetch req of type put to add to/remove from favorite
                  const check = user.favoriteEpisodes.find(
                    (epi) => epi.id === episode.id
                  )
                  if (check) {
                    //remove
                    user.favoriteEpisodes = user.favoriteEpisodes.filter(
                      (epi) => epi.id !== episode.id
                    )
                    e.currentTarget.querySelector("svg").classList =
                      "w-8 h-8 fill-transparent stroke-[30px] stroke-inherit"
                    e.currentTarget.querySelector('span').textContent = 'Add to favorite'
                    return
                  }
                  //add
                  user.favoriteEpisodes.push(episode)
                  e.currentTarget.querySelector("svg").classList =
                    "w-8 h-8 fill-yellow-400"
                  e.currentTarget.querySelector("span").textContent ="Remove from favorite"
                  
                }}
                className="flex p-2 items-center gap-x-4 hover:bg-base-300 dark:hover:bg-neutral-700 rounded-xl cursor-pointer"
              >
                <svg
                  className={`${user.favoriteEpisodes.find((epi) =>
                    epi.id === episode.id)
                      ? "w-8 h-8 fill-yellow-400"
                      : "w-8 h-8 fill-transparent stroke-[30px] stroke-inherit"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                </svg>
                <span>{user.favoriteEpisodes.find(epi=>epi.id === episode.id)?'Remove from':'Add to'} favorite</span>
              </div>
            </ul>
          </div>
        </div>
        <AudioPlayer
          episode={episode}
          creator={creator}
          podcastId={podcastId}
        />
      </div>
      {/* options */}
      <div className="flex justify-center gap-x-4 lg:gap-x-8 items-center text-blue-500 dark:text-blue-300 text-nowrap">
        {/* poll */}
        <div className="flex flex-col items-center gap-y-3 hover:scale-110 cursor-pointer">
          <svg
            className="fill-[#104F6A] dark:fill-blue-300 w-5 lg:w-6"
            width="24"
            height="27"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M22.8 0C23.1183 0 23.4235 0.145879 23.6485 0.405544C23.8736 0.66521 24 1.01739 24 1.38462V20.7692C24 21.1365 23.8736 21.4886 23.6485 21.7483C23.4235 22.008 23.1183 22.1538 22.8 22.1538H5.346L0 27V1.38462C0 1.01739 0.126428 0.66521 0.351472 0.405544C0.576515 0.145879 0.88174 0 1.2 0H22.8ZM13.2 5.53846H10.8V16.6154H13.2V5.53846ZM18 8.30769H15.6V16.6154H18V8.30769ZM8.4 11.0769H6V16.6154H8.4V11.0769Z" />
          </svg>

          <span>Join Poll</span>
        </div>
        {/* share */}
        <div onClick={(e)=>e.currentTarget.querySelector('.share-modal').showModal()} className="flex flex-col items-center gap-y-3 hover:scale-110 cursor-pointer">
          <svg
            className="fill-[#104F6A] dark:fill-blue-300 w-5 lg:w-6"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.6667 4.16808C16.6667 3.06263 17.1057 2.00247 17.8871 1.2208C18.6685 0.439135 19.7283 0 20.8333 0C21.9384 0 22.9982 0.439135 23.7796 1.2208C24.561 2.00247 25 3.06263 25 4.16808C24.9995 4.86997 24.8218 5.56038 24.4834 6.17525C24.145 6.79013 23.6569 7.30956 23.0642 7.68537C22.4716 8.06117 21.7937 8.28119 21.0934 8.32501C20.3932 8.36883 19.6931 8.23503 19.0583 7.93602L15.2167 12.5392L18.6133 17.3042C19.2437 16.9072 19.9688 16.6865 20.7134 16.665C21.4579 16.6436 22.1946 16.8222 22.8467 17.1822C23.4989 17.5423 24.0426 18.0706 24.4213 18.7122C24.8 19.3538 24.9998 20.0853 25 20.8304C25.0002 21.4838 24.8469 22.1281 24.5524 22.7113C24.2579 23.2945 23.8305 23.8002 23.3046 24.1877C22.7787 24.5753 22.1691 24.8337 21.525 24.9422C20.8809 25.0506 20.2204 25.0061 19.5966 24.8122C18.9729 24.6182 18.4035 24.2803 17.9343 23.8257C17.4652 23.3712 17.1094 22.8126 16.8958 22.1951C16.6822 21.5777 16.6167 20.9186 16.7045 20.2712C16.7924 19.6238 17.0312 19.006 17.4017 18.4679L13.7433 13.3395H8.24833C8.03739 14.3482 7.46049 15.2431 6.62893 15.8514C5.79737 16.4598 4.77006 16.7385 3.74517 16.6339C2.72028 16.5293 1.77043 16.0487 1.07884 15.2849C0.387251 14.5211 0.00292512 13.5281 0 12.4976C0.00102746 11.4646 0.385426 10.4689 1.07867 9.70337C1.77191 8.93785 2.72462 8.4571 3.75207 8.35432C4.77952 8.25154 5.80852 8.53405 6.63957 9.14709C7.47062 9.76013 8.04452 10.66 8.25 11.6723H13.77L17.72 6.93735C17.0401 6.17545 16.665 5.18941 16.6667 4.16808Z" />
          </svg>
          <span>Share</span>
          <Share shareUrl={`${window.location.origin}/profile/${creator}/${podcastId}/${episode.id}#${episode.id}`} />
        </div>
        {/* pin */}
        <div className="flex flex-col items-center gap-y-3 hover:scale-110 cursor-pointer">
          <svg
            className="fill-[#104F6A] dark:fill-blue-300 w-5 lg:w-6"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.989 0.819491C17.5131 0.343294 16.8813 0.0548136 16.2098 0.00704903C15.5382 -0.0407155 14.8719 0.155444 14.3334 0.559489L10.2612 3.6138C8.5696 4.88275 6.58539 5.70485 4.49196 6.00414L1.44866 6.43747C0.428171 6.58425 -0.319724 7.68296 0.172349 8.76071C0.635065 9.77136 2.10849 12.4357 6.26734 16.7564L0.426773 22.5967C0.293256 22.7256 0.186758 22.8799 0.113494 23.0504C0.0402295 23.221 0.00166574 23.4044 5.27814e-05 23.59C-0.00156018 23.7756 0.03381 23.9597 0.104099 24.1315C0.174389 24.3033 0.27819 24.4593 0.409445 24.5906C0.540701 24.7218 0.696783 24.8256 0.868584 24.8959C1.04039 24.9662 1.22446 25.0016 1.41008 24.9999C1.5957 24.9983 1.77913 24.9598 1.94969 24.8865C2.12024 24.8133 2.2745 24.7068 2.40345 24.5732L8.24402 18.733C12.565 22.8916 15.2295 24.365 16.2402 24.8277C17.3166 25.3197 18.4168 24.5719 18.5622 23.5514L18.9969 20.5083C19.2962 18.415 20.1184 16.4309 21.3874 14.7393L24.4405 10.6674C24.8445 10.1289 25.0407 9.46268 24.9929 8.79115C24.9452 8.11962 24.6567 7.48788 24.1805 7.01199L17.989 0.819491Z" />
          </svg>
          <span>Pin</span>
        </div>
      </div>
    </div>
  )
}
export default SingleEpisode
