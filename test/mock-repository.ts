// test/mock-repositories.ts
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { Vehicle } from '../src/vehicle/entities/vehicle.entity';

// What ever the real methods are, we can mock them here
export const mockRepository = jest.fn(() => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  remove: jest.fn(),
  query: jest.fn(),
}));

// Mock the User entity including the validatePassword method
export const mockUser = {
  ...mockRepository(),
  validatePassword: jest.fn(),
};

// Getting unique tokens for our User and Vehicle repositories
export const userRepositoryToken = getRepositoryToken(User);
export const vehicleRepositoryToken = getRepositoryToken(Vehicle);

// Creating a dictionary to map these tokens to our fake repositories

export const mockRepositories = {
  [String(userRepositoryToken)]: mockUser,
  [String(vehicleRepositoryToken)]: mockRepository(),
};
