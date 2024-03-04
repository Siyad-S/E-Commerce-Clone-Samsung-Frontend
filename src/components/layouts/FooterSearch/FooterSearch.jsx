import React from 'react'
import "./FooterSearch.css"
import Footer from '../Footer/Footer'

const FooterSearch = () => {
  return (
    <>
        <div className='search_footer'>
        <div className='search_footer_title'><h1>Looking for something else?</h1></div>
        <div className='search_input'>
            {/* <button><span className="material-symbols-outlined">search</span></button> */}
            {/* <label htmlFor="footer_search">Search Keyword</label> */}
            <i className="material-symbols-outlined">search</i>
            <input name='footer_search' type="search" placeholder='Search Keyword' />
        </div>
    </div>
    <Footer />
    </>
  )
}

export default FooterSearch