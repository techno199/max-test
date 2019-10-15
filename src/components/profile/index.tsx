import React, { useEffect, useState } from 'react';
import { FETCH_USER_INFO, AuthState, UserInfo } from '../../store/auth/types';
import { fetchUserInfoAction, setUserInfoAction } from '../../store/auth/actions';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import VkIcon from '../../img/vk.jpg';
import TelegramIcon from '../../img/telegram.jpg';
import YoutubeIcon from '../../img/youtube.jpg';
import TwitterIcon from '../../img/twitter.jpg';
import TwitchIcon from '../../img/twitch.jpg';
import WebIcon from '../../img/web.jpg';
import classNames from 'classnames';
import { withStyles } from '@material-ui/styles';

const styles = { 
  section: {
    padding: '10px 0'
  },
  sectionTitle: {
    display: 'block'
  },
  sectionNode: {
    paddingLeft: '12px',
    display: 'block'
  },
  social: {
    '&:hover span': {
      opacity: 1
    },
    color: 'black'
  },
  socialIcon: {
    width: '20px',
    height: '20px'
  },
  socialName: {
    transition: 'opacity .2s ease',
    opacity: 0,
    marginLeft: '12px'
  }
}

interface Props {
  classes: any;
  auth: AuthState;
  getUserInfo: (userId: number) => Observable<AxiosResponse<any>>;
  setUserInfo: (userInfo: UserInfo) => void;
}

const Profile = (props: Props) => {
  const initialErrors: any = {};
  const [errors, setErrors] = useState(initialErrors);

  useEffect(() => {
    props.auth.userId &&
      props.getUserInfo(props.auth.userId)
        .subscribe(res => {
          props.setUserInfo(res.data.data as UserInfo);
        }, err => {
          setErrors({ ...errors, userNotFound: 'Ошибка при загрузке пользователя' });
        });
  }, []);

  const userInfo = props.auth.userInfo;
  const socialLinks = userInfo && userInfo.social && getSocialLinks(userInfo.social);
    

  return (
    <>
      {
        errors.userNotFound && (
          <div>{ errors.userNotFound }</div>
        )
      }
      {
        userInfo && (
          <>
            <div className={props.classes.section}>
              Город: { userInfo.city }
            </div>

            <div className={props.classes.section}>
              <span className={props.classes.sectionTitle}>Знание языков:</span>
              {
                userInfo.languages.map(lang => <span key={lang} className={props.classes.sectionNode}>{ lang }</span>)
              }
            </div>
            <div className={props.classes.section}>
              <span className={props.classes.sectionTitle}>Ссылки:</span>
              {
                socialLinks &&
                  socialLinks.map(socialLink => 
                    <a key={socialLink.link} href={socialLink.link} className={classNames(props.classes.sectionNode, props.classes.social)}>
                      {
                        <>
                          <img className={props.classes.socialIcon} src={socialLink.iconSrc} />
                          <span className={props.classes.socialName}>{ socialLink.label }</span>
                        </>
                      }
                    </a>
                  )
              }
            </div>
          </>
        )
      }
    </>
  )
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch: any) => ({
  getUserInfo: (userId: number) => {
    return dispatch(fetchUserInfoAction(userId));
  },
  setUserInfo: (userInfo: UserInfo) => {
    dispatch(setUserInfoAction(userInfo));
  }
})

const ProfileStyled = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));

export { ProfileStyled as Profile }

const labelToIconMap: { label: string; iconSrc: string, order?: number }[] = [
  {
    label: 'web',
    iconSrc: WebIcon,
    order: 1
  },
  {
    label: 'vk',
    iconSrc: VkIcon
  },
  {
    label: 'telegram',
    iconSrc: TelegramIcon
  },
  {
    label: 'youtube',
    iconSrc: YoutubeIcon
  },
  {
    label: 'twitter',
    iconSrc: TwitterIcon
  },
  {
    label: 'twitch',
    iconSrc: TwitchIcon
  }
];

interface SocialLink {
  iconSrc: string;
  link: string;
  label: string;
  order?: number;
}

export const getSocialLinks = (links: { link: string; label: string }[]): SocialLink[] => {
  return links
    .map(s => {
      const additionalIconInfo = labelToIconMap.find(e => e.label === s.label) || { label: '', iconSrc: ''};

      return { ...additionalIconInfo, link: s.link, order: additionalIconInfo.order || 0 }
    })
    .sort((a, b) => b.order - a.order);
}