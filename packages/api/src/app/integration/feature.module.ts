import { AssetModule } from '@modules/asset';
import { BasePromptModule } from '@modules/base-prompt';
import { UserModule } from '@modules/user';
import { Module } from '@nestjs/common';

const features = [AssetModule, UserModule, BasePromptModule];

@Module({
  imports: [...features],
  exports: [...features],
})
export class FeatureModule {
}

