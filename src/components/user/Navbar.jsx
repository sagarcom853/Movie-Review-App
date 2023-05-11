import React, { useState } from "react";
import { BsSunFill } from "react-icons/bs";
import SearchBar from "@mkyy/mui-search-bar";
import Container from "../../auth/Container";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "../../Hooks";

const Navbar = () => {
  //emmet helps using html and css together
  const [textFieldValue, setTextFieldValue] = useState("");
  const { toggleTheme } = useTheme();
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;

  const handleSearch = () => {
    if (textFieldValue) {
      setTextFieldValue("");
    }
  };

  return (
    <div className='bg-purple-800 shadow-lg shadow-black-900'>
      <Container className='p-2 '>
        <div className='flex flex-column flex-wrap justify-between items-center'>
          <a href='/'>
            <img
              src='https://tse2.mm.bing.net/th?id=OIP.BtXmRuRBzOf1ukSFHQc0UAHaHa&pid=Api&P=0'
              alt=''
              className='h-10 ml-20'
            />
          </a>
          <ul className='flex flex-wrap justify-between items-center space-x-4'>
            <li>
              <SearchBar
                size='small'
                value={textFieldValue}
                onChange={(newValue) => setTextFieldValue(newValue)}
                onSearch={() => handleSearch()}
                placeholder='Search....'
                className='text-purple-400 bg-transparent focus:border-white hover:border-white'
              />
            </li>
            <li>
              <button
                className='bg-dark-subtle p-1 rounded'
                onClick={toggleTheme}
              >
                <BsSunFill className='text-secondary' size={24} />
              </button>
            </li>
            <li>
              {isLoggedIn ? (
                <Link to='/' className='text-white' onClick={handleLogout}>
                  Logout
                </Link>
              // <button>LOgout</button>
              ) : (
                <Link to='/auth/signin' className='text-white'>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
