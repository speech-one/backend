import { AssetModule } from '@modules/asset';
import { BasePromptModule } from '@modules/base-prompt';
import { MCPModule } from '@modules/mcp';
import { UserModule } from '@modules/user';
import { Module } from '@nestjs/common';

const features = [AssetModule, UserModule, BasePromptModule, MCPModule];

@Module({
  imports: [...features],
  exports: [...features],
})
export class FeatureModule {
}

