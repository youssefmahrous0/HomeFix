import React from 'react'
import style from './ContactLayout.module.css'
import ContactInfoCard from './../ContactInfoCard/ContactInfoCard';
import ContactWorkingHours from './../ContactWorkingHours/ContactWorkingHours';
import ContactSocialLinks from './../ContactSocialLinks/ContactSocialLinks';
import ContactForm from './../ContactForm/ContactForm'; 
export default function ContactLayout() {
  return (

    <>
      <section>
  <div className="container">
    <div className="flex flex-col lg:flex-row-reverse gap-6">
      
      <div className="w-full lg:w-1/3">
        <ContactInfoCard />
        <ContactWorkingHours />
        <ContactSocialLinks />
      </div>

      <div className="w-full lg:w-2/3">
        <ContactForm />
      </div>

    </div>
  </div>
</section>
    </>
    
  )
}
