import React from 'react'
import style from './Home.module.css'
import Hero from '../Hero/Hero'
import PopularCategories from './../PopularCategories/PopularCategories';
import HowItWorksStep from './../HowItWorksStep/HowItWorksStep';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import CallToAction from './../CallToAction/CallToAction';
import footer from '../Footer/Footer';


export default function Home() {
  return <>

    <Hero />
    <PopularCategories />
    <WhyChooseUs />
    < HowItWorksStep />
    <CallToAction />
    
  </>
}
