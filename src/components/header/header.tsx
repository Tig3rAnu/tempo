'use client';
import headerData from '@/components/header/data/header.json';
import Link from 'next/link';
import i18n from '@/i18n';
import Image from 'next/image';
import {
  AlignJustify,
  ChevronDown,
  Divide,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  PhoneCall,
  Twitter,
  User,
  XCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';
import { Login } from '../login/Login';
import SignUpForm from '../signup/signup';
import { CustomDropdownList } from '@/common/Dropdown';

function Header() {
  const pathName = usePathname();
  const [isSticky, setSticky] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [openMenus, setOpenMenus] = useState<boolean>(false);

  const loginModalHandler = () => {
    setIsOpenModal(!isOpenModal);
  };
  const handleMenus = () => {
    setOpenMenus(!openMenus);
  };
  const hideMenusHandle = () => {
    setOpenMenus(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 ${isSticky ? 'sticky_header' : ''}`}
    >
      <div className="container mx-auto flex justify-between items-center max-[991px]:flex-wrap">
        <Link
          href="/"
          className={`bg-white/[0.3] p-2 rounded-bl-lg rounded-br-lg shadow-2xl ${
            isSticky ? 'hidden max-[991px]:block' : 'block'
          }`}
        >
          <Image
            src="/img/logo.png"
            width={100}
            height={100}
            className="max-[991px]:w-[75px] max-[991px]:h-[80px]"
            alt="logo"
          />
        </Link>
        <nav className="flex items-center flex-wrap justify-center max-[991px]:w-full max-[991px]:absolute max-[991px]:flex-wrap max-[991px]:top-0 max-[991px]:right-0">
          <div
            className={`flex justify-between w-[70%] mx-auto mb-8 transition-opacity ${
              isSticky ? 'opacity-0' : ''
            } max-[991px]:hidden`}
          >
            <Link
              href="mailto:siksha.study@dummymail.com"
              className="flex hover:text-[#1546FF] transition-all"
            >
              <Mail className="mr-2" />
              {i18n.t('en_emailAddress')}
            </Link>
            <Link
              href="tel:+919002020220"
              className="flex hover:text-[#1546FF] transition-all"
            >
              <PhoneCall className="mr-2" />
              {i18n.t('+919002020220')}
            </Link>
          </div>
          <ul
            className={`main_nav flex space-x-8 bg-white rounded-full px-4 py-2 shadow-2xl items-center max-[991px]:flex-wrap max-[991px]:space-x-0 max-[991px]:w-full max-[991px]:rounded-lg max-[991px]:space-y-2 max-[991px]:py-4 ${openMenus ? 'max-[991px]:block' : 'max-[991px]:hidden'}`}
          >
            <li className="hidden max-[991px]:block">
              <XCircle onClick={hideMenusHandle} />
            </li>
            {(headerData?.header || []).map((item) => {
              return (
                <li key={item.key} className="relative max-[991px]:w-full">
                  {item.services ? (
                    <CustomDropdownList
                      title={item.name}
                      items={item.services}
                    />
                  ) : item.courses ? (
                    <CustomDropdownList
                      title={item.name}
                      items={item.courses}
                    />
                  ) : (
                    <Link
                      href={item.path}
                      className={`hover:text-[#1546FF] transition-all ${
                        pathName === item.path ? 'text-[#1546FF]' : ''
                      }`}
                    >
                      {i18n.t(`en_${item.key}`)}
                    </Link>
                  )}
                </li>
              );
            })}
            <li className="self-center border-l-2 border-[#1546FF] pl-3">
              <ul className="flex items-center space-x-4">
                <li>
                  <Button
                    className="bg-transparent p-0 border-none text-[#1546FF] hover:bg-transparent h-auto flex items-center underline"
                    onClick={loginModalHandler}
                  >
                    <User size={20} className="mr-2" />
                    {i18n.t('en_login')}
                  </Button>
                </li>
                {/* <li>
                  <Link href="" className="hover:text-[#1546FF] transition-all">
                    <Facebook size={20} />
                  </Link>
                </li>
                <li>
                  <Link href="" className="hover:text-[#1546FF] transition-all">
                    <Linkedin size={20} />
                  </Link>
                </li>
                <li>
                  <Link href="" className="hover:text-[#1546FF] transition-all">
                    <Instagram size={20} />
                  </Link>
                </li>
                <li>
                  <Link href="" className="hover:text-[#1546FF] transition-all">
                    <Twitter size={20} />
                  </Link>
                </li> */}
              </ul>
            </li>
          </ul>
        </nav>
        <div className="hidden max-[991px]:block">
          <AlignJustify onClick={handleMenus} />
        </div>
      </div>
      <Modal isOpen={isOpenModal} clsName="bg-white" setOpen={setIsOpenModal}>
        <Tabs defaultValue="login" className="w-full md:w-[400px] p-0">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </Modal>
    </header>
  );
}

export default Header;
