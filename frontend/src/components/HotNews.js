import React, { useEffect, useState }  from 'react';
import {Link} from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import { listApplications } from '../actions/applicationActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import ApplicationReview from './ApplicationReview'
import {useHistory} from 'react-router-dom';
import Pagination from '../Pagination';
import parse from 'html-react-parser';



export default withNamespaces() (function HotNews(props){
  const {t} = props;
  const dispatch = useDispatch();
  function dropdownmenu() {
        document.getElementById("myDropdown").classList.toggle("show");
      }
      //Close dropdown menu when click link
      const applicationList = useSelector((state) => state.applicationList);
      const { loading, error, applications } = applicationList;
      useEffect(() => {
        dispatch(listApplications({}));
        }, [dispatch]); 
        const history = useHistory();
       
        const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return <div className="hotnews">
            {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                    {applications.length === 0 && (
                        <MessageBox>No News Found</MessageBox>
                    )}
            <ul className="main-hotnews">
                {applications && applications.filter(item => item.articletype == "tin-tuc").slice(0).reverse().slice(0,1).map((application) =>(
                <li key={application._id}>
                    <Link className='main-hotnews-link' to={`/tin-moi/${application._id}`}>
                        <img className='main-hotnews-img' src={application.articleimage} alt="afa" />
                    </Link>
                    <Link to={`/search-news/articlecategory/${application.articlecategory}`} className='article-category' data-tag={application.articlecategory}>{application.articlecategory}</Link>
                    <div className="hotnews-overlay">
                        <h2><Link to={`/tin-moi/${application._id}`}>{t("title", {application}).length > 250 ? t("title",{application}).substring(0, 247) + "..." : t("title",{application})}</Link></h2>
                        <small><i className="far fa-clock"></i> {formatter.format(new Date(application.createdAt))}  <i className="fas fa-comment"></i> {application.reviews.length}</small>
                        {/* <div>{parse(t("content", {application}).length > 150 ? t("content",{application}).substring(0, 147) + "..." : t("content",{application}))}</div> */}
                    </div>
                </li>
                ))}
            </ul>
            </>
            )}
            {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                    {applications.length === 0 && (
                        <MessageBox>No News Found</MessageBox>
                    )}
            <ul className="sub-hotnews">
                {applications && applications.filter(item => item.articletype == "tin-tuc").slice(0).reverse().slice(1,5).map((application) =>(
                <li key={application._id}>
                    <Link className='main-hotnews-link' to={`/tin-moi/${application._id}`}><img className='sub-hotnews-img' src={application.articleimage} alt="afa" /></Link>
                    <Link to={`/search-news/articlecategory/${application.articlecategory}`} className='article-category' data-tag={application.articlecategory}>{application.articlecategory}</Link>
                    <div className="hotnews-overlay">
                        <h2><Link to={`/tin-moi/${application._id}`}>{t("title", {application}).length > 60 ? t("title",{application}).substring(0, 57) + "..." : t("title",{application})}</Link></h2>
                        {/* <small><i className="far fa-clock"></i> {formatter.format(new Date(application.createdAt))}  <i className="fas fa-comment"></i> {application.reviews.length}</small> */}
                        {/* <div>{parse(t("content", {application}).length > 150 ? t("content",{application}).substring(0, 147) + "..." : t("content",{application}))}</div> */}
                    </div>
                </li>
                ))}
            </ul>
            </>
            )}
      </div>
    })
