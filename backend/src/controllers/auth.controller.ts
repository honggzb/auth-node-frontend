import { Response, Request } from "express";
import { Joi } from "express-validation";
import bcryptjs from 'bcryptjs';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { UserModel } from "../models/user.model";
import { TokenModel } from "../models/token.model";

const registerValidation = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  password_confirm: Joi.string().required()
});

// register
export const register = async (req: Request, res: Response) => {
  const body = req.body;

  const {error} = registerValidation.validate(body);
  if(error) {
    return res.status(400).send(error.details)
  }

  if(body.password !== body.password_confirm) {
    return res.status(400).send({
      message: "Password's do not match!"
    })
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(body.password, salt);

  const user = new UserModel({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: hashedPassword
  });

  const result = await user.save();
  const { password, ...data } = await result.toJSON();    //remove password

  res.send(data);
}

/* login */
export const login = async (req: Request, res: Response) => {
  var user = await UserModel.findOne({ email: req.body.email });
  if(!user) {
    return res.status(400).send({
      message: 'invalid credentials'
    });
  }
  if(!await bcryptjs.compare(req.body.password, user.password)) {
    return res.status(400).send({
      message: 'invalid credentials'
    })
  }
  //const accessToken = sign({ _id: user._id }, process.env.JWT_ACCESS_SECRET as string || '', { expiresIn: '30s'});
  const refreshToken = sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET as string || '', { expiresIn: '1w'});
  // res.cookie('access_token', accessToken, {
  //   httpOnly: true,                           //only backend can access
  //   maxAge: 24 * 60  * 60 * 100     //1 day
  // });
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,                              //only backend can access
    maxAge: 7* 24 * 60  * 60 * 100     //7 day
  });
  const expired_at = new Date();
  expired_at.setDate(expired_at.getDate() + 7);
  const tokenSave = new TokenModel({
    user_id: user._id,
    token: refreshToken,
    expired_at
  });
  await tokenSave.save();
// for security and front end using
  const token = sign({ _id: user._id }, process.env.JWT_ACCESS_SECRET as string || '', { expiresIn: '30s'});

  res.send({ token });
  //res.send({ message: 'success' });
  //res.send(user);
}

// Authenticated User
export const authenticatedUser = async (req: Request, res: Response) => {
  try{

    const accessToken = req.header('Authorization')?.split(' ')[1] as string;
    console.log("accessToken=", accessToken);
    const payload = verify(accessToken, process.env.JWT_ACCESS_SECRET as string || '') as JwtPayload;
    console.log("payload=", payload)
    if(!payload) {
      return res.status(401).send({
        message: '1unautheticated!'
      })
    }
    const user = await UserModel.findOne({ _id: payload._id });
    console.log("user", user)
    if(!user) {
      return res.status(401).send({
        message: '2unautheticated!'
      })
    }
    const { password, ...data } = await user.toJSON();    //remove password
    res.send(data);

  } catch(error) {

    return res.status(401).send({
      message: '3unautheticated!'
    })

  }

}

// refresh token
export const refresh = async (req: Request, res: Response) => {
  try {
    const cookie = req.cookies['refresh_token'];
    const payload: any = verify(cookie, process.env.JWT_REFRESH_SECRET || '');
    if(!payload) {
      return res.status(401).send({
        message: 'unautheticated!'
      })
    }
    // const accessToken = sign({ _id: payload.id }, process.env.JWT_ACCESS_SECRET as string || '', { expiresIn: '30s'});
    // res.cookie('access_token', accessToken, {
    //   httpOnly: true,                           //only backend can access
    //   maxAge: 24 * 60  * 60 * 100     //1 day
    // });

    // const refreshToken = await TokenModel.findOne({
    //   $or: [
    //     { user_id: payload._id },
    //     { expired_at:  { $st: new Date() } },
    //   ]
    // });
    const refreshToken = await TokenModel.findOne({
      user_id: payload._id
    });
    if(!refreshToken) {
      return res.status(401).send({
        message: 'unautheticated!'
      })
    }

    const token = sign({ _id: payload.id }, process.env.JWT_ACCESS_SECRET as string || '', { expiresIn: '30s'});
    res.send({ token });
    //res.send({ message: 'success' });

  } catch (error) {
    return res.status(401).send({
      message: 'unautheticated!'
    })
  }
}

// logout
export const logout = async (req: Request, res: Response) => {

  //res.cookie('access_token', '', { maxAge: 0});
  res.cookie('refresh_token', '', { maxAge: 0});
  await TokenModel.deleteOne({
    token: req.cookies['refresh_token']
  });

  res.send({
    message: 'logged out!'
  })

}