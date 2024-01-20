import React , {useState} from 'react';
import styles from "../../styles/Comment.module.css"
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { CardBody } from 'react-bootstrap';
import {Card}  from 'react-bootstrap';
import {MoreDropdown} from '../../components/MoreDropdown'
import {useCurrentUser} from "../../contexts/CurrentUserContext"
import { axiosRes } from '../../api/axiosDefaults';

import CommentEditForm from "./CommentEditForm";

const Comment = (props) => {
    const {profile_id,profile_image,owner,updated_at,content,id,setPost,setComments} = props;
    const [showEditForm,setShowEditForm] = useState(false);
    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === owner;
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments/${id}/`)
            setPost(prevPost => ({
                results: [{
                    ...prevPost.results[0],
                    comments_count:prevPost.results[0].comments_count-1
                }]
            })) 
            setComments(prevComments => ({
                ...prevComments,
                results:prevComments.results.filter(comment => comment.id !== id)
            }))
        }catch(err){

        }
    }

    return (
        <>
          <hr />
          <Card>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} />
            </Link>
            <CardBody className="align-self-center ml-2">
              <span className={styles.Owner}>{owner}</span>
              <span className={styles.Date}>{updated_at}</span>
              {showEditForm ? (
                <CommentEditForm
                id={id}
                profile_id={profile_id}
                content={content}
                profileImage={profile_image}
                setComments={setComments}
                setShowEditForm={setShowEditForm}
              />
              ) : (
                <p>{content}</p>
              )}
            </CardBody>
            {is_owner && !showEditForm && (
              <MoreDropdown
                handleEdit={() => setShowEditForm(true)}
                handleDelete={handleDelete}
              />
            )}
          </Card>
        </>
      );
}

export default Comment;
