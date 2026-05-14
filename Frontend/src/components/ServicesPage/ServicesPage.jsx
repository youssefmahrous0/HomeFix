import React from 'react'
import style from './ServicesPage.module.css'
import ServicesHero from './../ServicesHero/ServicesHero'
import ServicesLayout from '../ServicesLayout/ServicesLayout'
import ServicesContact from './../ServicesContact/ServicesContact';


export default function ServicesPage() {
  return (<>
    <ServicesHero /> 
    <ServicesLayout />
    <ServicesContact />
  </>
  )
}
