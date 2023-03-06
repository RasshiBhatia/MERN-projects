import React,{ useState, useEffect } from 'react'
import './App.css'
import Post from './Post'
import {db, auth} from './firebase'
import { Button, Avatar, makeStyles, Modal, Input } from "@material-ui/core";
import ImageUpload from './ImageUpload';
import InstagramEmbed from "react-instagram-embed";
function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      height: "300px",
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      height: 200,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
const App = () => {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [openSignIn, setOpenSignIn] = useState(false)
    const [username, setUsername] = useState('')
    const [modalStyles] = useState(getModalStyle);
    const [user, setUser] = useState(null)
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                //user has logged in
                console.log(authUser)
                setUser(authUser);
            } else {
                //user has logged out
                setUser(null);
            }
        })
        return () => {
            unsubscribe();
        }
    }, [user, username])
    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })))
        });
    }, [posts]);  
    const handleLogin = () => {

    }
    const signUp = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            return authUser.user.updateProfile({
                displayName: username
            })
        })
        .catch((error) => alert(error.message))
        setOpen(false);
    }
    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .catch(error => alert(error.message));
        setOpenSignIn(false);
    }
    return (
        <div className="app">
            
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                
                <div style={modalStyles} className={classes.paper}>
                    <form className='app__signup'>
                        <center>
                            <img
                                className="app__headerImage"
                                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                alt=""
                            />
                        </center>
                        <Input 
                            placeholder='username'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input 
                            placeholder='email'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input 
                            placeholder='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button onClick={signUp}>Sign Up</Button>
                    </form>
                </div>
            </Modal>
            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
            >
                
                <div style={modalStyles} className={classes.paper}>
                    <form className='app__signup'>
                        <center>
                            <img
                                className="app__headerImage"
                                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                alt=""
                            />
                        </center>
                        <Input 
                            placeholder='email'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input 
                            placeholder='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button onClick={signIn}>Sign In</Button>
                    </form>
                </div>
            </Modal>
            <div className="app__header">
                <img
                    className="app__headerImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt=""
                />
                {
                user ? (
                        <Button onClick={() => auth.signOut()}>Logout</Button>
                        ) : (
                        <div>
                            <Button onClick={() => setOpen(true)}>Sign Up</Button>
                            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                        </div>
                    )
                }
            </div>
            <div className="app__posts">
                    {
                        posts.map(({id, post}) => (
                            <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
                        ))
                    }
            </div>
            { 
                user?.displayName ? (
                    <ImageUpload username={user.displayName} />
                ) : (
                    <h3>Login to upload</h3>
                )
            }
        </div>
    )
}


export default App;
