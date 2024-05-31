import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import * as jwt from 'jsonwebtoken';
import { JwtAuthGuard } from '../auth/auth.guard';
import { User } from '../users/entities/user.entity';
import { Washplan } from '../washplan/entities/washplan.entity';
import { UpdateResult } from 'typeorm';

describe('VehicleController', () => {
  let controller: VehicleController;
  let service: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            getWashPlanByVehicleId: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<VehicleController>(VehicleController);
    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a vehicle', async () => {
      const req = {
        headers: {
          authorization: 'Bearer fakeToken',
        },
        user: { id: 1, username: 'testuser' },
      };
      const createVehicleDto: CreateVehicleDto = {
        id: 0,
        licencePlateNumber: '',
        model: '',
        color: '',
        year: '',
        user: new User(),
        washplan: new Washplan(),
      } as CreateVehicleDto;
      const decodedToken = { id: 1, username: 'testuser' };

      jest.spyOn(jwt, 'verify').mockImplementation(() => decodedToken);
      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => createVehicleDto);

      await controller.create(req, createVehicleDto);

      expect(jwt.verify).toHaveBeenCalledWith('fakeToken', 'secret');
      expect(createVehicleDto.user).toEqual(
        expect.objectContaining({
          id: decodedToken.id,
          username: decodedToken.username,
        }),
      );
      expect(service.create).toHaveBeenCalledWith(createVehicleDto);
    });
  });

  describe('findAll', () => {
    it('should return all vehicles for the user', async () => {
      const req = {
        user: { id: 1, username: 'testuser' },
      };
      const vehicles = [
        {
          id: 1,
          licencePlateNumber: 'testLicencePlateNumber',
          model: 'testModel',
          color: 'testColor',
          year: 'testYear',
          user: new User(),
          washplan: new Washplan(),
        },
        {
          id: 2,
          licencePlateNumber: 'testLicencePlateNumber2',
          model: 'testModel2',
          color: 'testColor2',
          year: 'testYear2',
          user: new User(),
          washplan: new Washplan(),
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(vehicles);

      const result = await controller.findAll(req);
      console.log('result', result);

      expect(result).toBe(vehicles);
      expect(service.findAll).toHaveBeenCalledWith(req.user);
    });
  });

  describe('getWashPlan', () => {
    it('should return the wash plan for a vehicle', async () => {
      const req = { user: { id: 1, username: 'testuser' } };
      const washPlan = {
        washplanName: 'testWashPlan',
        washplanPrice: 10,
      };

      jest
        .spyOn(service, 'getWashPlanByVehicleId')
        .mockResolvedValue(washPlan as Washplan);

      const result = await controller.getWashPlan(req, 1);

      expect(result).toBe(washPlan);
      expect(service.getWashPlanByVehicleId).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a vehicle', async () => {
      const req = {
        user: { id: 1, username: 'testuser' },
        headers: {
          authorization: 'Bearer fakeToken',
        },
      };
      const createVehicleDto: CreateVehicleDto = {
        id: 0,
        licencePlateNumber: '',
        model: '',
        color: '',
        year: '',
        user: new User(),
        washplan: new Washplan(),
      };

      jest
        .spyOn(service, 'update')
        .mockImplementation(async () => ({}) as UpdateResult);

      await controller.update('1', req, createVehicleDto);

      expect(service.update).toHaveBeenCalledWith(1, createVehicleDto);
    });
  });

  describe('remove', () => {
    it('should remove a vehicle', async () => {
      jest.spyOn(service, 'remove').mockImplementation(() => '');

      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
