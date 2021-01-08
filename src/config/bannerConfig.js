import banner1 from "../images/tball.jpg";
import defaultLogo from "../images/default.jpg";
const bannerList = [{ page: "home", banner: banner1 },{page: "topBar" ,banner: defaultLogo }];

 const pageBanner = type => {
  let bannerFound = bannerList.find(item => item.page === type);
  if (bannerFound) return bannerFound.banner;

  return false;
};


export default pageBanner;