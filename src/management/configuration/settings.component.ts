/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import SidenavService from "../../components/sidenav/sidenav.service";
import {IScope} from "angular";
import UserService from "../../services/user.service";
import _ = require('lodash');
import { StateService } from '@uirouter/core';

const SettingsComponent: ng.IComponentOptions = {

  template: require("./settings.html"),
  controller: function (
    $rootScope: IScope,
    SidenavService: SidenavService,
    $state: StateService,
    UserService: UserService
  ) {
    'ngInject';
    this.$state = $state;
    this.settingsMenu = {
      // PORTAL
      analytics: {
        perm: UserService.isUserHasPermissions(
          ['portal-settings-r']),
        goTo: 'management.settings.analytics'
      },
      apiPortalHeader: {
        perm: UserService.isUserHasPermissions(
          ['portal-api_header-r']),
        goTo: 'management.settings.apiPortalHeader'
      },
      clientRegistration: {
        perm: UserService.isUserHasPermissions(
          ['portal-client_registration_provider-r']),
        goTo: 'management.settings.clientregistrationproviders.list'
      },
      identityProviders: {
        perm: UserService.isUserHasPermissions(
          ['portal-identity_provider-r']),
        goTo: 'management.settings.identityproviders.list'
      },
      documentations: {
        perm: UserService.isUserHasPermissions(
          ['portal-documentation-r']),
        goTo: 'management.settings.documentation'
      },
      metadata: {
        perm: UserService.isUserHasPermissions(
          ['portal-metadata-r']),
        goTo: 'management.settings.metadata'
      },
      portalSettings: {
        perm: UserService.isUserHasPermissions(
          ['portal-settings-r']),
        goTo: 'management.settings.portal'
      },
      topApis: {
        perm: UserService.isUserHasPermissions(
          ['portal-top-apis-r']),
        goTo: 'management.settings.top-apis'
      },
      views: {
        perm: UserService.isUserHasPermissions(
          ['portal-view-r', ]),
        goTo: 'management.settings.views'
      },

      // MANAGEMENT
      managementSettings: {
        perm: UserService.isUserHasPermissions(
          ['management-settings-r']),
        goTo: 'management.settings.management'
      },

      // GATEWAYS
      api_logging: {
        perm: UserService.isUserHasPermissions(
          ['managment-settings-r']),
        goTo: 'management.settings.api_logging'
      },
      dictionaries: {
        perm: UserService.isUserHasPermissions(
          ['management-dictionary-r']),
        goTo: 'management.settings.dictionaries.list'
      },
      tags: {
        perm: UserService.isUserHasPermissions(
          ['management-tag-r']),
        goTo: 'management.settings.tags'
      },
      tenants: {
        perm: UserService.isUserHasPermissions(
          ['management-tenant-r']),
        goTo: 'management.settings.tenants'
      },

      // USER MANAGEMENT
      users: {
        perm: UserService.isUserHasPermissions(
          ['management-user-r']),
        goTo: 'management.settings.users'
      },
      groups: {
        perm: UserService.isUserHasPermissions(
          ['management-group-r']),
        goTo: 'management.settings.groups'
      },
      roles: {
        perm: UserService.isUserHasPermissions(
          ['management-role-r']),
        goTo: 'management.settings.roles'
      },

      // ALERT
      notifications: {
        perm: UserService.isUserHasPermissions(
          ['management-notification-r']),
        goTo: 'management.settings.notifications'
      }};

    this.$onInit = () => {
      if ($state.current.name === 'management.settings') {
        $rootScope.$broadcast('reduceSideNav');
        SidenavService.setCurrentResource('SETTINGS');

        for ( let entry of _.keys(this.settingsMenu)) {
          if (this.settingsMenu[entry].perm) {
            $state.go(this.settingsMenu[entry].goTo);
            break;
          }
        }
      }
    };
  }
};

export default SettingsComponent;
