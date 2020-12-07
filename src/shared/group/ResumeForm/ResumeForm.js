import React, { useEffect, useState, useRef } from 'react';
import 'reactjs-popup/dist/index.css';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import './ResumeForm.scss';
import Popup from 'reactjs-popup';
import { changeDateFormat } from '../../../utils/DateFormatWrapper';
/**
 * Created by Piyush on Sun Oct 04 2020 15:16:09 GMT+0530 (India Standard Time)
 * Resume popup form
 * Updated by Piyush on Sun Oct 04 2020 15:16:09 GMT+0530 (India Standard Time)
 * Resume popup form
 */

function ResumeForm({ triggerContent, user_id }) {
  const ref = useRef();
  const { Loader, apiConfig, ApiCall } = global;
  const [ActiveLoader, changeLoader] = useState(false);
  console.log('IN resume ', ref);
  // const [data, changeData] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        let reqBody = {
          user_id,
        };
        changeLoader(true);
        let response = await ApiCall(
          apiConfig[apiConfig.currentEnv],
          apiConfig.getResume.url,
          apiConfig.getResume.method,
          '',
          reqBody,
        );
        changeLoader(false);
        if (response.data.code === 200) {
          // changeData(response.data.result);
        } else {
          toast('Data Not Found', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            // type: 'dark',
          });
        }
      } catch (error) {
        toast(error.message, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          // type: 'dark',
        });
        changeLoader(false);
      }
    }
    fetchData();
  }, [user_id, apiConfig, ApiCall]);
  let data = {
    first_name: 'Sujay',
    last_name: 'Pol',
    address: 'Kalyan, Maharastra',
    phone_number: '9898989898',
    email_id: 'useThis@gmail.com',
    work_experience: [
      {
        company_name: 'TATA Motors',
        company_location: 'Thane, Maharastra',
        designation: 'Software Developer',
        start_date: '2020-10-03T09:43:05.385Z',
        end_date: '2020-10-03T19:43:05.385Z',
        tangible_achievement: [],
      },
      {
        company_name: 'TATA Motors',
        company_location: 'Thane, Maharastra',
        designation: 'Software Developer',
        start_date: '2020-10-03T09:43:05.385Z',
        end_date: '2020-10-03T19:43:05.385Z',
        tangible_achievement: [],
      },
      {
        company_name: 'TATA Motors',
        company_location: 'Thane, Maharastra',
        designation: 'Software Developer',
        start_date: '2020-10-03T09:43:05.385Z',
        end_date: '2020-10-03T19:43:05.385Z',
        tangible_achievement: [],
      },
    ],
    key_skills: [
      'Android Studio',
      'Flutter',
      'ASP .Net',
      'Dashboard Building',
      'Android Studio',
      'Flutter',
      'ASP .Net',
      'Dashboard Building',
    ],
    education_detail: [
      {
        category: 'University of mumbai',
        course_name: 'BE in Computer Science',
        start_year: 2014,
        end_year: 2018,
        institute: 'Pillai College of Engg',
      },
      {
        category: 'University of mumbai',
        course_name: 'BE in Computer Science',
        start_year: 2014,
        end_year: 2018,
        institute: 'Pillai College of Engg',
      },
      {
        category: 'University of mumbai',
        course_name: 'BE in Computer Science',
        start_year: 2014,
        end_year: 2018,
        institute: 'Pillai College of Engg',
      },
    ],
  };
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 820px)',
  });
  let css = { height: '70vh', width: '90%' };
  let customCss = {
    boxSizeHorizontal: `${
      isDesktopOrLaptop ? 'box-size-y-20' : 'box-size-y-20'
    }`,
  };
  if (isDesktopOrLaptop) {
    css.height = '100vh';
    css.width = '40%';
  }
  return (
    <Popup contentStyle={css} trigger={triggerContent} modal ref={ref}>
      <div className="column height-100 overflow-y-auto company-text-responsive font-family-regular black margin-20">
        {ActiveLoader === true ? (
          <div className="flex-container flex-one center align-center ">
            <Loader height="10vh" width="10vh" loaderColor="#000000" />
          </div>
        ) : (
          <>
            <div className="row">
              <div className=" thin-border" />
              <div className="box-size-x-10" />
              <div className="column">
                <p className="name-text black">{`${data.first_name} ${data.last_name}`}</p>
                <div className="box-size-y-5" />
                <p>{`${data.address}`}</p>
                <div className="box-size-y-5" />
                <p>Contact: {`${data.phone_number}/ ${data.email_id}`}</p>
              </div>
            </div>
            <div className="row">
              <div className="box-size-y-20" />
            </div>
            <div className="row">
              <div className="column">
                <p className="name-text black">Work Experience</p>
                <ul className="resume-ul">
                  {data.work_experience.map((item, index) => {
                    return (
                      <div>
                        <div className="box-size-y-10" />
                        <div className="resume-li bold row" key={index}>
                          <div className="column width-100">
                            <div className="row space-between">
                              <p>{item.company_name}</p>
                              <p className="job-duration-text-responsive">
                                <i className="fa fa-envelope margin-x-4" />
                                {item.company_location}
                              </p>
                            </div>
                            <div className="row author-text-responsive black margin-y-4">
                              {item.designation}
                            </div>
                            <div className="row job-duration-text-responsive  ">
                              {`${changeDateFormat(
                                item.start_date,
                                true,
                              )}-${changeDateFormat(item.end_date, true)}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
            <hr className="margin-y-20" />

            <div className="row">
              <div className="column">
                <p className="name-text black">Key Skill Details</p>
                <div className="row">
                  {data.key_skills.map((item, index) => {
                    return (
                      <div className="row bold margin-y-8">
                        <p>{item}</p>

                        {data.key_skills.length - 1 === index ? (
                          ''
                        ) : (
                          <div className="box-size-x-5" />
                        )}
                        {data.key_skills.length - 1 === index ? (
                          ''
                        ) : (
                          <div className="black-bg more-thin-border" />
                        )}
                        {data.key_skills.length - 1 === index ? (
                          ''
                        ) : (
                          <div className="box-size-x-5" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <hr className="margin-y-20" />
            <div className="row">
              <div className="column">
                <p className="name-text black">Educational Details</p>
                <ul className="resume-ul">
                  {data.education_detail.map((item, index) => {
                    return (
                      <div>
                        <div className="box-size-y-10" />
                        <div className="resume-li bold row" key={index}>
                          <div className="column width-100">
                            <div className="row space-between">
                              <p>{item.institute}</p>
                            </div>
                            <div className="row space-between author-text-responsive black margin-y-4">
                              <p>{item.course_name}</p>
                              <p className="job-duration-text-responsive">
                                <i className="fa fa-envelope margin-x-4" />
                                {item.category}
                              </p>
                            </div>
                            <div className="row job-duration-text-responsive  ">
                              {`${item.start_year} - ${item.end_year}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="box-size-y-20" />
            </div>
          </>
        )}
      </div>
    </Popup>
  );
}

export default ResumeForm;
