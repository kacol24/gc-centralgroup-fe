'use client';

import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
  const MapContact = useMemo(
    () =>
      dynamic(() => import('./components/map-contact'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );
  return (
    <section className="w-full container mx-auto px-4 h-auto pt-[170px] lg:pt-[223px] bg-backgroundWhite lg:pb-[90px] pb-0">
      <h1 className="lg:text-[64px] lg:leading-[70px] items-center justify-center text-center lg:mb-12 font-marcellus text-textPrimary uppercase sm:flex hidden">
        The Trusted Real Estate <br /> Authority For Those <br /> Seeking The Best.
      </h1>
      <h1 className="text-4xl px-6  items-center justify-center text-center font-marcellus mb-8 text-textPrimary uppercase sm:hidden flex">
        The Trusted Real <br /> Estate Authority <br /> For Those <br /> Seeking The Best.
      </h1>
      <p className="text-sm px-6 font-medium text-center text-textPrimary mb-[60px] lg:mb-20">
        Thank you for visiting our site. As a dynamic digital platform, it will continuously update with new property{' '}
        <br className="hidden lg:block" />
        listings, sales outcomes, news articles, market trends and special Forbes event notifications. We encourage you
        to <br className="hidden lg:block" /> visit regularly to ensure you remain up to date with our ever changing
        sphere of influence.
      </p>

      <div className="w-full relative">
        <div className="w-full px-8 py-12  lg:p-20 bg-[#192E2E] flex flex-col justify-start">
          <h3 className="text-2xl text-backgroundWhite tracking-wider font-marcellus uppercase">
            Central Group Development
          </h3>
          <div className="w-full lg:w-[55%] lg:flex items-start gap-28 mt-10">
            <div className="text-white space-y-4">
              <div className="flex items-center gap-3">
                <IoLogoWhatsapp className="text-xl opacity-60" />
                <span>+62 811 703 8868</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-xl opacity-60" />
                <span>info@centralgroup.com</span>
              </div>
            </div>

            {/* Work Address */}
            <div className="mt-6 md:mt-0 text-white space-y-4  ">
              <div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-xl opacity-60" />
                  <span className="font-bold">Central Group Head Office</span>
                </div>
                <p className="ml-8 opacity-80">
                  Jl. Central Raya No.1, Sukajadi, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29432
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-xl opacity-60" />
                  <span className="font-bold">Representative Office</span>
                </div>
                <p className="ml-8 opacity-80">
                  Ruko Campton A-03, Jl. Raya Cisauk Lapan, Sampora, Tangerang - Banten 15345
                </p>
              </div>
            </div>
          </div>
        </div>
        <MapContact />

        <div className="w-full flex-col flex lg:hidden lg:flex-col ">
          <div className="p-12 bg-white shadow-xl rounded-sm">
            <h1 className="font-marcellus text-textPrimary text-2xl uppercase mb-8">GEt In touch</h1>

            <div className="space-y-4 mb-6">
              {/* Property Price */}
              <div className="space-y-2">
                <Label htmlFor="property-price" className="text-[10px] font-semibold text-gray-900">
                  YOUR NAME
                </Label>
                <Input
                  id="name"
                  placeholder="Your Name"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#E1E1E1',
                    borderRadius: '0px',
                    fontSize: '12px',
                  }}
                  className=" text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="down-payment" className="text-[10px] font-semibold text-gray-900">
                  NOMOR HANDPHONE
                </Label>
                <div className="relative">
                  <span className="absolute flex inset-y-0 left-3  items-center text-black text-[12px] pointer-events-none">
                    +62
                  </span>
                  <Input
                    id="phone"
                    placeholder="87654321"
                    style={{
                      backgroundColor: 'white',
                      borderColor: '#E1E1E1',
                      borderRadius: '0px',
                      fontSize: '12px',
                      paddingLeft: '40px',
                    }}
                    className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loan-term" className="text-[10px] font-semibold text-gray-900">
                  YOUR EMAIL
                </Label>
                <Input
                  id="email"
                  placeholder="Your Email"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#E1E1E1',
                    borderRadius: '0px',
                    fontSize: '12px',
                  }}
                  className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loan-term" className="text-[10px] font-semibold text-gray-900">
                  YOUR MESSAGE
                </Label>
                <Textarea
                  id="message"
                  placeholder="Your Message"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#E1E1E1',
                    borderRadius: '0px',
                    fontSize: '12px',
                  }}
                  className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                />
              </div>
            </div>

            <Button variant="filled" className="rounded-none w-full font-medium text-xs py-[16px] uppercase">
              Send Message
            </Button>
          </div>
        </div>

        <div className="absolute top-1/2 -translate-y-[60%] right-20">
          <div className="w-[405px] hidden lg:flex lg:flex-col ">
            <div className="p-12 bg-white shadow-xl rounded-sm">
              <h1 className="font-marcellus text-textPrimary text-2xl uppercase mb-8">GEt In touch</h1>

              <div className="space-y-4 mb-6">
                {/* Property Price */}
                <div className="space-y-2">
                  <Label htmlFor="property-price" className="text-[10px] font-semibold text-gray-900">
                    YOUR NAME
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    style={{
                      backgroundColor: 'white',
                      borderColor: '#E1E1E1',
                      borderRadius: '0px',
                      fontSize: '12px',
                    }}
                    className=" text-gray-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="down-payment" className="text-[10px] font-semibold text-gray-900">
                    NOMOR HANDPHONE
                  </Label>
                  <div className="relative">
                    <span className="absolute hidden lg:flex inset-y-0 left-3  items-center text-black text-[12px] pointer-events-none">
                      +62
                    </span>
                    <Input
                      id="phone"
                      placeholder="87654321"
                      style={{
                        backgroundColor: 'white',
                        borderColor: '#E1E1E1',
                        borderRadius: '0px',
                        fontSize: '12px',
                        paddingLeft: '40px',
                      }}
                      className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loan-term" className="text-[10px] font-semibold text-gray-900">
                    YOUR EMAIL
                  </Label>
                  <Input
                    id="email"
                    placeholder="Your Email"
                    style={{
                      backgroundColor: 'white',
                      borderColor: '#E1E1E1',
                      borderRadius: '0px',
                      fontSize: '12px',
                    }}
                    className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loan-term" className="text-[10px] font-semibold text-gray-900">
                    YOUR MESSAGE
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Your Message"
                    style={{
                      backgroundColor: 'white',
                      borderColor: '#E1E1E1',
                      borderRadius: '0px',
                      fontSize: '12px',
                    }}
                    className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                  />
                </div>
              </div>

              <Button variant="filled" className="rounded-none w-full font-medium text-xs py-[16px] uppercase">
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
