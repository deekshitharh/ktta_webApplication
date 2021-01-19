import banner1 from "../images/tball.jpg";
import defaultLogo from "../images/default.jpg";
import defaultnews from "../images/news_default.jpg"
import defaultofficeB from "../images/officebearer_def.png"
import defaultSponses from "../images/sponsers_default.png"
const bannerList = [{ page: "home", banner: banner1 },{page: "topBar" ,banner: defaultLogo },{page: "sponsers" ,banner: defaultSponses },{page: "news" ,banner:  defaultnews },{page: "OfficeBeaers" ,banner: defaultofficeB }];
// logo and home page banner banner config
 const pageBanner = type => {
  let bannerFound = bannerList.find(item => item.page === type);
  if (bannerFound) return bannerFound.banner;

  return false;
};


export default pageBanner;