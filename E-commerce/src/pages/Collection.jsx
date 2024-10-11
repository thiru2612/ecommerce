import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';

const Collection = () => {

  const {products}=useContext(ShopContext);
  const[showFilter,setFilter]=useState(false);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/*Filter Options*/}
      <div className='min-w-60'>
        <p onClick={()=>setFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
            <img className={`h-3 sm:hidden ${showFilter?'rotate-90':''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter? '':'hidden'} sm:block`}> 
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox"  value={'Men'} />Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} />Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} />Kids
            </p>
          </div>
        </div> 
        {/* Subcategory */}
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter? '':'hidden'} sm:block`}> 
          <p className='mb-3 text-sm font-medium'>Type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox"  value={'Topwear'} />Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} />Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'} />Winterwear
            </p>
          </div>
        </div> 
      </div>

        <div className='flex-1'>
            <div className='flex justify-between text-base sm:text-2xl mb-4'>
                <Title text1={'ALL '} text2={'COLLECTIONS'}/>
            </div>
        </div>

    </div>
  )
}

export default Collection;
