import React from 'react'
import style from './ContactPage.module.css'
import ContactHero from './../ContactHero/ContactHero';
import ContactLayout from '../ContactLayout/ContactLayout';
import ContactFrequentlyAskedQuestions from './../ContactFrequentlyAskedQuestions/ContactFrequentlyAskedQuestions';


export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactLayout />
      <ContactFrequentlyAskedQuestions /> 
    </>
  )
}
