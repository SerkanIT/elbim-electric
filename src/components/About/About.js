import React from "react";
import "./About.scss";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import SEO from "../../SEO";
import AboutImg from "../../media/s2.jpg";

const About = () => {
  const { t } = useTranslation();
  const card = [
    {
      id: 1,
      theme: 1,
      icon: <i className="bx bx-cut"></i>,
      title_uz: "To'qimachilik korxonalari",
      title_ru: "Текстильные предприятия",
    },
    {
      id: 2,
      theme: 2,
      icon: <i className="bx bx-file"></i>,
      title_uz: "Qog'oz ishlab chiqarih korxonalari",
      title_ru: "Предприятия по производству бумаги",
    },
    {
      id: 3,
      theme: 3,
      icon: <i className="bx bxs-city"></i>,
      title_uz: "Qurilish materiallari ishlab chiqarish korxonalari",
      title_ru: " Предприятия по производству строительных материалов",
    },
    {
      id: 4,
      theme: 1,
      icon: <i className="bx bx-cookie"></i>,
      title_uz: "Qandolat mahsulotlari ishlab chiqarish korxonalari ",
      title_ru: "Предприятия по производству кондитерских изделий ",
    },
    {
      id: 5,
      theme: 2,
      icon: <i className="bx bxs-cube"></i>,
      title_uz: "Metalurgiya va og'ir sanoat mahsulotlari ",
      title_ru: "Продукция металлургии и тяжелой промышленности",
    },
    {
      id: 6,
      theme: 3,
      icon: <i className="bx bx-sun"></i>,
      title_uz: "Quyosh panellari o'rnatish",
      title_ru: "Установка солнечных батарей",
    },
    {
      id: 7,
      theme: 2,
      icon: <i className="bx bxs-cloud-lightning"></i>,
      title_uz: "Istalgan turdagi elektronik qurilmalarni ta'mirlash",
      title_ru: "Ремонт любых электронных устройств",
    },
  ];
  const settings2 = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1189,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 914,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 566,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <SEO />
      <div className="up">
        <div className="category">{t("Biz haqimizda")}</div>
      </div>

      <div className="upper-about">
        <div className="left_side">
          <img src={AboutImg} alt="Nothing" />
        </div>
        <div className="right_side">
          <p className="text-about">
            {t(
              "Elbim elektronik MJCH  2008-yildan boshlab O'zbekistonda sanoat va ishlab chiqarish korxonalariga sifatli xizmat ko'rsatib kelmoqda. Bizning faoliyatimizning asosiy yo'nalishlari quyidagilar sanoat qurilmalarini ta'mirlash, modernizatsiyalash, sanoat qurilmalariga dasturiy ta'minot ishlab chiqish va kerakli ehtiyot qismlarini yetkazib berish xizmati. Bundan tashqari Elbim elektronik MJCH sanoat va ishlab chiqarish uskunalarini bir joydan ikkinchi joyga sifatli ko'chirib berish va yangisini o'rnatib berish xizmatini ham taklif qiladi. Agar siz yangi biznes boshlayotgan bo'lsangiz va ishlab chiqarish qurilmalarini qanday, qayerdan olishni bilmayotgan bo'lsangiz biz sizga yordam beramiz, shu bilan birga sifatli yetkazib berish va ishga tushirish xizmatlarini ham taklif qilamiz."
            )}
          </p>
        </div>
      </div>

      <div className="up">
        <div className="category">{t("Xizmat ko'rsatish sohalarimiz")}</div>
      </div>
      <Slider className={"custom-slider"} {...settings2}>
        {card.map((card) => (
          <div className={`card__bx card__${card.theme}`}>
            <div className="card__data">
              <div className="card__icon">
                <div className="card__icon-bx">{card.icon}</div>
              </div>
              <div className="card__content">
                <h3>
                  {localStorage.getItem("value") === "uz" ? (
                    <>{card.title_uz}</>
                  ) : (
                    <>{card.title_ru}</>
                  )}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default About;
