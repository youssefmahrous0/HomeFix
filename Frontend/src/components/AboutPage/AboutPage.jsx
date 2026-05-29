import React from 'react'
import style from './AboutPage.module.css'
import AboutHero from './../AboutHero/AboutHero';
import AboutFeatures from './../AboutFeatures/AboutFeatures';
import AboutStats from './../AboutStats/AboutStats';
import AboutTeam from './../AboutTeam/AboutTeam';
import AboutText from './../AboutText/AboutText';
import AboutJoinTeam from './../AboutJoinTeam/AboutJoinTeam';


export default function AboutPage() {
  return (
    <>
    <AboutHero />
    <AboutFeatures />
    <AboutStats />
    <AboutTeam />
    <AboutText />
    <AboutJoinTeam />
    </>
  )
}
