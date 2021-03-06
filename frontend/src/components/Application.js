import React from 'react';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import parse from 'html-react-parser';

export default withNamespaces((props) => props.namespaces)(function Application(props){
    const {t} = props;
    const {application} = props;
    const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
   
    
    return (  
        <div key= {application._id}  className="newsbox">
                        <div className="newsbox-image">
                            <Link className="" to={`/tin-moi/${application._id}`}>
                                <img src={application.articleimage}  alt="news-bla" />
                            </Link> 
                            <div className='overlay'>
                                <div className='text'>
                                    {parse(t("content",{application}).length > 100 ? t("content",{application}).substring(0, 97) + "..." : t("content",{application}))} 
                                </div>
                        </div>
                        <Link to={`/search-news/articlecategory/${application.articlecategory}`} className='article-category' data-tag={application.articlecategory} >{application.articlecategory}</Link>
                        </div>
                        <div className='newsbox-title'>
                            <Link to={`/tin-moi/${application._id}`}>{t("title",{application}).length > 50 ? t("title",{application}).substring(0, 47) + "..." : t("title",{application})}</Link>                        
                            <small>{formatter.format(new Date(application.createdAt))}</small>
                        </div>

                </div>
    );
})