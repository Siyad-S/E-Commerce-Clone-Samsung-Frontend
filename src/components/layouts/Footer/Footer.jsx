import React, { useEffect } from "react";
import "./Footer.css";
// import { getSubCategory } from "../../../Redux/Slices/HomePageSlice"
// import { useDispatch ,useSelector } from "react-redux"

const Footer = () => {
  // const subcategories = useSelector((state) => state.homeSlice.allSubCategories.subCategories)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //     dispatch(getSubCategory())
  // },[])

  // console.log(subcategories);
  const productServices = [
    "Smartphones",
    "Tablets",
    "Audio Sound",
    "Watches",
    "Smart Switch",
    "Mobile Accessories",
    "TVs",
    "Sound Devices",
    "Refrigerators",
    "Laundry",
    "Air Solutions",
    "Cooking Appliances",
    "Monitors",
    "Memory Storage",
  ];
  const shop = [
    "FAQs",
    "Contact Us",
    "Welcome Voucher",
    "Samsung Referral Advantage",
    "Samsung Student Advantage",
    "Defence Purchase Program",
    "Corporate Employee Program",
    "Corporate Bulk Purchase",
    "Samsung Experience Store",
    "Store Locator",
    "Smart Club",
    "Terms of Use",
    "Order Grievance Redressal",
    "Explore",
  ];
  const support = [
    "WhatsApp Us (हिंदी/ English)",
    "Sign Language",
    "Email Us ",
    "Call Us",
    "Email the CEO",
    "Community",
    "Product Registration",
    "Track Repair",
    "Service Centre",
    "Share Your Opinion",
  ];
  const accountCommunity = [
    "My Page",
    "My Products",
    "Orders",
    "Wishlist",
    "Vouchers",
    "My Referrals",
    "Service",
    "Community",
  ];
  const sustainability = [
    "Environment",
    "Security & Privacy",
    "Accessibility",
    "Diversity · Equity · Inclusion",
    "Corporate Citizenship",
    "Corporate Sustainability",
  ];
  const aboutUs = [
    "Company Info",
    "Business Area",
    "Brand Identity",
    "Careers",
    "Investor Relations",
    "Newsroom",
    "Ethics",
    "Samsung Design",
  ];

  return (
    <div className="footer">
      <div className="footer_section">
        <div className="options">
          <h3>Product & Service</h3>
          <ul>
            {productServices?.map((product, index) => (
              <li key={index}>
                <a>{product}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="options">
          <h3>Shop</h3>
          <ul>
            {shop?.map((shop, index) => (
              <li key={index}>
                <a>{shop}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="options">
          <h3>Support</h3>
          <ul>
            {support?.map((support, index) => (
              <li key={index}>
                <a>{support}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="options">
          <h3>Account & Community</h3>

          <ul>
            {accountCommunity?.map((accountCommunity, index) => (
              <li key={index}>
                <a>{accountCommunity}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="options">
          <div className="sustinability">
            <h3>Sustinability</h3>
            <ul>
              {sustainability?.map((sustainability, index) => (
                <li key={index}>
                  <a>{sustainability}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="about_us">
            <h3>About Us</h3>
            <ul>
              {aboutUs?.map((aboutUs, index) => (
                <li key={index}>
                  <a>{aboutUs}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer_legal">
        <p>Copyright ⓒ 1995-2024 SAMSUNG All Rights reserved.</p>
        <p>
          Please dispose of e-waste and plastic waste responsibly. For more
          information or e-waste pick up, please call 1800 5 7267864 for more
          details.
        </p>
        <p>
          Registered Office Address: 6th Floor, DLF Centre, Sansad Marg, New
          Delhi-110001 Corporate Identification Number (CIN):
          U31900DL1995PTC071387
        </p>
      </div>
      <div className="social_media">
        
      </div>
    </div>
  );
};

export default Footer;
