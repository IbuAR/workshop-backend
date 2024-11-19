import { Sequelize } from 'sequelize-typescript';
import { Train } from 'src/entity/train.entity';
import { User } from 'src/entity/user.entity';

// This provider sets up a connection to the database using Sequelize (ORM)
export const databaseProvider = {
  provide: 'SEQUELIZE',
  // Factory function helps to create an object that is to be injected
  useFactory: async () => {
    const sequelize = new Sequelize({
      dialect: 'mysql', 
      host: 'localhost',
      username: 'root',  
      password: '',  // set your mysql password here
      database: 'train_booking_system', // Database schema name
      define: { timestamps: false }, // Disable automatic timestamps like createdAt and updatedAt
    });

    sequelize.addModels([Train, User]);

    return sequelize;
  },
};

export const TrainsProvider = {
  provide: 'TRAINS_REPOSITORY',
  useValue: Train
}

export const UsersProvider = {
  provide: 'USERS_REPOSITORY',
  useValue: User
}