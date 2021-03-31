import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as rds from '@aws-cdk/aws-rds';
import { AuroraCapacityUnit } from '@aws-cdk/aws-rds';

export class AuroraServerlessStack extends cdk.Stack {

  readonly vpc: ec2.Vpc;
  readonly blogDB: rds.ServerlessCluster;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, 'BlogAppVpc', {
      cidr: '10.0.1.0/24',
      natGateways: 0,
      subnetConfiguration: [
        {cidrMask: 26, name: 'Isolated', subnetType: ec2.SubnetType.ISOLATED}
      ],
    })

    this.blogDB = new rds.ServerlessCluster(this, 'BlogDbAuroraServerlessCluster', {
      engine: rds.DatabaseClusterEngine.AURORA_MYSQL,
      parameterGroup: new rds.ParameterGroup(this, 'BlogDbParameterGroup', {
        engine: rds.DatabaseClusterEngine.AURORA_MYSQL,
        parameters: {
          character_set_client: 'utf8mb4',
          character_set_connection: 'utf8mb4',
          character_set_database: 'utf8mb4',
          character_set_results: 'utf8mb4',
          character_set_server: 'utf8mb4'
        }
      }),
      defaultDatabaseName: 'BlogDB',
      vpc: this.vpc,
      vpcSubnets: {subnetType: ec2.SubnetType.ISOLATED},
      scaling: {
        autoPause: cdk.Duration.minutes(5),
        minCapacity: AuroraCapacityUnit.ACU_1,
        maxCapacity: AuroraCapacityUnit.ACU_2,
      }
    })
  }
}
