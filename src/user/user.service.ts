import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Register a new user
  async createUser(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return await newUser.save();
  }

  // Login a user and return JWT token
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find the user by email
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Compare the password with the hashed password
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateJwtToken(user.id, user.email);

    return { token, user };
  }

  // Generate a JWT token
  private generateJwtToken(userId: string, email: string) {
    const payload = { userId, email };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
  }
}
