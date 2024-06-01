import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function SideBanners() {
  const [sideBannerList, setSideBannerList] = useState();

  useEffect(() => {
    getSideBanners();
  }, []);

  const getSideBanners = () => {
    GlobalApi.getSideBanner().then(resp => {
      console.log(resp);
      setSideBannerList(resp.sideBanners);
    });
  };

  return (
    <div className="relative p-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-inner">
      <div className="absolute inset-0 opacity-20 bg-no-repeat bg-center bg-cover" style={{ backgroundImage: 'url(/mnt/data/image.png)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative flex flex-wrap justify-center items-center">
        {sideBannerList && sideBannerList.map((item, index) => (
          <div 
            key={index} 
            className="m-4 p-4 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
            onClick={() => window.open(item?.url)}
          >
            <Image 
              src={item.banner.url} 
              alt='banner'
              width={400}
              height={200}
              className='rounded-xl cursor-pointer'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBanners;
