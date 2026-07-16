import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import Features from '../components/Features'
import CTASection from '../components/CTASection'
import FaqPage from './faqPage'

const Home = () => {
  const navigate = useNavigate()

  return (
    
<div>
  
  <div className="w-full px-4 mx-auto">
    <Header
      badgeSubtext="Sistem Deteksi Kesehatan Mental Remaja"
      title={
        <>
          Ceritakan Perasaanmu, <br /> Kami Bantu Memahaminya
        </>
      }
      description= "Ceritakan perasaanmu dan dapatkan analisis kondisi mental berbasis AI. Pantau perkembanganmu dari waktu ke waktu melalui satu platform yang mudah digunakan."
      primaryBtnText="Mulai Analisis"
      secondaryBtnText="Pelajari Lebih Lanjut"
      onPrimaryClick={() => navigate("/analysis")}
      onSecondaryClick={() => navigate("/about")}
    />
  </div>
    <Features />
    <CTASection/>
    <FaqPage/>
</div>
  
    
  )
}

export default Home

