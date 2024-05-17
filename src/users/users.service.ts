import { BadRequestException, Injectable , NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignUpDto } from './dto/users-signup.dto';
import { hash  , compare} from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';


@Injectable()//injectable dec. is engine to run the controller
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,//here we can use userentity for update delete etc
  ) {}
  //every promise is async function
async signup(userSignUpDto:UserSignUpDto):Promise<UserEntity>{
const userExists= await this.FindUserByEmail(userSignUpDto.email);
if(userExists)
  throw new BadRequestException('Email is already exists');
  userSignUpDto.password= await hash(userSignUpDto.password,10);
//sending password to user only
let user=this.usersRepository.create(userSignUpDto);
 user= await this.usersRepository.save(user);
 delete user.password;
 return user;

}
async signin(userSignInDto:UserSignInDto):Promise<UserEntity>{
  //compare the email and password if user is signin
  const userExists= await this.usersRepository.createQueryBuilder('users')
.addSelect('users.password')
.where('users.email=:email',{email:userSignInDto.email}).getOne();
if(!userExists) //if user is not exists
throw new BadRequestException('Bad credentials');
const matchpassword= await compare(userSignInDto.password,userExists.password);
if(!matchpassword)
throw new BadRequestException('Bad credentials');
delete userExists.password; //we are not sending password to user..if its wrong
return userExists;
  
}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() :Promise<UserEntity[]>{
    return  await this.usersRepository.find();
  }
//method to find user by id
  async findOne(id: number) :Promise<UserEntity>{
   const user = await this.usersRepository.findOneBy({id});
   if(!user)
    throw new NotFoundException('User not found');
  return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async FindUserByEmail(email:string){
    return await this.usersRepository.findOneBy({email});
  }
  async accessToken(user:UserEntity):Promise<string>{
    return sign({id:user.id ,email:user.email},process.env.ACCESS_TOKEN_SECRET_KEY,
      {expiresIn:process.env.ACCESS_TOKEN_EXPIRE_TIME})
      
      
  }
}



