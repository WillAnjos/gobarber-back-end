interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'willanjosaway@zohomail.com',
      name: 'Will do Get2Le@rn',
    }
  }
} as IMailConfig
