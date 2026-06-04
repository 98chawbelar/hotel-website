// assets.js

import logo from "./logo.webp";

//hero images
import hero_1 from "./hero-images/hero_1.webp";
import hero_2 from "./hero-images/hero_2.webp";
import hero_3 from "./hero-images/hero_3.webp";
import hero_4 from "./hero-images/hero_4.webp";
import hero_5 from "./hero-images/hero_5.webp";
import hero_6 from "./hero-images/hero_6.webp";
import reception from "./hotel_reception.webp";

// facilities images
import gym from "./facilities-image/gym.webp";
import gym_1 from "./facilities-image/gym_1.webp";
import gym_2 from "./facilities-image/gym_2.webp";
import parking from "./facilities-image/car_parking.webp";
import laundry from "./facilities-image/laundry.webp";
import garden from "./facilities-image/hotel_garden.webp";
import pool from "./facilities-image/swimming_pool.webp";
import restaurant from "./facilities-image/hotel_restaurant.webp";
import restaurant_1 from "./facilities-image/restaurant.webp";
import breakfast from "./facilities-image/breakfast.webp";
import american_breakfast from "./facilities-image/american_breakfast.webp";
import burmese_breakfast from "./facilities-image/burmese_breakfast.webp";
import laundry_1 from "./facilities-image/laundry_1.webp";
import laundry_2 from "./facilities-image/laundry_2.webp";

// rooms images
import king_rooms from "./room-images/king_bed.webp";
import twin_rooms from "./room-images/twin_bed.webp";
import deluxe_king_rooms from "./room-images/deluxeking_bed.webp";
import deluxe_twin_rooms from "./room-images/deluxetwin_bed.webp";
import family_rooms from "./room-images/family_room.webp";
import corridor from "./room-images/hotel_corridor.webp";
import bathroom from "./room-images/hotel_bathroom.webp";

// ROOM FACILITY ICONS
import {
  FaGlassCheers,
  FaPhone,
  FaShower,
  FaTv,
  FaWifi,
  FaClock,
  FaSuitcase,
  FaUtensils,
  FaBus,
  FaParking,
} from "react-icons/fa";
import { MdAcUnit } from "react-icons/md";
export const assets = {
  logo,
  hero_1,
  hero_2,
  hero_3,
  hero_4,
  hero_5,
  hero_6,
  reception,

  // Facilities
  gym,
  gym_1,
  gym_2,
  parking,
  laundry,
  laundry_1,
  laundry_2,
  garden,
  pool,
  restaurant,
  restaurant_1,
  breakfast,
  american_breakfast,
  burmese_breakfast,

  // rooms
  king_rooms,
  twin_rooms,
  deluxe_king_rooms,
  deluxe_twin_rooms,
  family_rooms,
  corridor,
  bathroom,
};

// =================== ROOM FACILITIES ===================
const roomFacilities = [
  { icon: MdAcUnit, title: "A/C" },
  { icon: FaWifi, title: "WiFi" },
  { icon: FaTv, title: "Smart TV" },
  { icon: FaPhone, title: "Telephone" },
  { icon: FaShower, title: "Shower" },
  { icon: FaGlassCheers, title: "Mini Bar" },
];

// =================== FACILITIES DATA ===================
export const facilities = [
  {
    name: "Restaurant",
    image: restaurant,
    link: "/facilities/restaurant",
    description: "Fine dining with international cuisine",
  },
  {
    name: "Gym",
    image: gym,
    link: "/facilities/gym",
    description: "Modern fitness center with full equipment",
  },
  {
    name: "Swimming Pool",
    image: pool,
    link: "/facilities/pool",
    description: "Outdoor pool with sun loungers and bar",
  },
  {
    name: "Car Parking",
    image: parking,
    description: "Secure and spacious parking area",
  },
  {
    name: "Garden",
    image: garden,
    description: "Relaxing outdoor garden space",
  },
  {
    name: "Laundry",
    image: laundry,
    link: "/facilities/laundry",
    description: "Clean and professional laundry service",
  },
];

// =================== ROOMS DATA ===================
export const rooms = [
  {
    id: 1,
    name: "Superior King",
    description:
      "The Superior King room offers a spacious and elegant environment designed for comfort and relaxation.",
    image: king_rooms,
    price: 50000,
    capacity: { adults: [1, 2], child: [1, 2] },
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    beds: 1,
    size: "25 sqm",
    facilities: roomFacilities,
  },

  {
    id: 2,
    name: "Superior Twin",
    description:
      "The Superior Twin room is ideal for friends, colleagues, or family members traveling together.",
    image: twin_rooms,
    price: 50000,
    capacity: { adults: [1, 2], child: [1, 2] },
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    beds: 2,
    size: "25 sqm",
    facilities: roomFacilities,
  },

  {
    id: 3,
    name: "Deluxe King",
    description:
      "The Deluxe King room offers a premium hospitality experience with luxury and comfort.",
    image: deluxe_king_rooms,
    price: 80000,
    capacity: { adults: [1, 2], child: [1, 2] },
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    beds: 1,
    size: "35 sqm",
    facilities: roomFacilities,
  },

  {
    id: 4,
    name: "Deluxe Twin",
    description:
      "The Deluxe Twin room is designed for guests who prefer comfort and style.",
    image: deluxe_twin_rooms,
    price: 80000,
    capacity: { adults: [1, 2], child: [1, 2] },
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    beds: 2,
    size: "35 sqm",
    facilities: roomFacilities,
  },

  {
    id: 5,
    name: "Family Room",
    description:
      "The Family Room is a spacious and comfortable option designed for families.",
    image: family_rooms,
    price: 100000,
    capacity: { adults: [1, 2, 3], child: [1, 2, 3] },
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    beds: 2,
    size: "50 sqm",
    facilities: roomFacilities,
  },
];

export const extraServices = [
  {
    key: "earlyCheckIn",
    icon: FaClock,
    label: "Early Check-In",
    price: 500,
    desc: "Check in before 12:00 PM",
  },

  {
    key: "lateCheckOut",
    icon: FaSuitcase,
    label: "Late Check-Out",
    price: 500,
    desc: "Check out after 12:00 PM",
  },

  {
    key: "breakfast",
    icon: FaUtensils,
    label: "Breakfast Included",
    price: 1200,
    desc: "Daily breakfast for all guests",
  },

  {
    key: "busTransfer",
    icon: FaBus,
    label: "Bus Station Transfer",
    price: 2000,
    desc: "Pick-up & drop-off service",
  },

  {
    key: "extraParking",
    icon: FaParking,
    label: "Extra Parking",
    price: 500,
    desc: "Reserved parking slot",
  },
];

export const hotelMap =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.6152014974373!2d96.51132174839013!3d22.919166325176803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x373367d8fef0cb73%3A0xf5ba1490b7ca4fa6!2sKandaw!5e0!3m2!1sen!2sth!4v1779932489019!5m2!1sen!2sth";
